import createHttpError from "http-errors";
import { unifiedusersCollection } from "../db/models/unifiedusers.js";

export const upsertunifieduser = async (payload) => {
  console.log("--- upsertunifieduser START ---");
  console.log(
    "Payload received in upsertunifieduser:",
    JSON.stringify(payload, null, 2)
  );

  // ГИБКАЯ ОБРАБОТКА ДАННЫХ
  // Определяем, пришёл ли объект 'user' или поля находятся на верхнем уровне
  const user = payload.user || payload;
  const conferences = payload.conferences;

  if (!user) {
    throw createHttpError(400, "User data is missing from the payload.");
  }

  const { fullName, phoneNumber, email, telegram } = user;

  const searchQuery = { $or: [] };

  if (email && email.trim() !== "") {
    searchQuery.$or.push({ email: email.toLowerCase() });
  }
  if (phoneNumber && phoneNumber.trim() !== "") {
    searchQuery.$or.push({ phoneNumber: phoneNumber });
  }
  if (telegram && telegram.userName && telegram.userName.trim() !== "") {
    searchQuery.$or.push({ "telegram.userName": telegram.userName });
  }
  if (telegram && telegram.id && telegram.id.trim() !== "") {
    searchQuery.$or.push({ "telegram.id": telegram.id });
  }

  let unifieduserData;
  if (searchQuery.$or.length > 0) {
    unifieduserData = await unifiedusersCollection.findOne(searchQuery);
    console.log(
      "Found user on initial search (if any):",
      unifieduserData ? unifieduserData._id : "None found"
    );
  }

  const newConferenceData = conferences[0];
  let targetConferenceIndex;
  let actionTaken = "added";

  if (unifieduserData) {
    unifieduserData.fullName = {
      firstName:
        fullName?.firstName || unifieduserData.fullName?.firstName || "",
      lastName: fullName?.lastName || unifieduserData.fullName?.lastName || "",
    };
    unifieduserData.phoneNumber =
      phoneNumber || unifieduserData.phoneNumber || "";
    unifieduserData.email = email || unifieduserData.email || "";

    if (telegram) {
      if (telegram.id) unifieduserData.telegram.id = telegram.id;
      if (telegram.userName)
        unifieduserData.telegram.userName = telegram.userName;
      if (telegram.firstName)
        unifieduserData.telegram.firstName = telegram.firstName;
      if (telegram.languageCode)
        unifieduserData.telegram.languageCode = telegram.languageCode;
      if (telegram.phone) unifieduserData.telegram.phone = telegram.phone;
      if (telegram.isPremium !== undefined)
        unifieduserData.telegram.isPremium = telegram.isPremium;

      if (telegram.source && telegram.source.length > 0) {
        telegram.source.forEach((src) => {
          if (!unifieduserData.telegram.source.includes(src)) {
            unifieduserData.telegram.source.push(src);
          }
        });
      }
      if (telegram.transitions && telegram.transitions.length > 0) {
        telegram.transitions.forEach((trans) => {
          const isDuplicate = unifieduserData.telegram.transitions.some(
            (existingTrans) =>
              existingTrans.date.getTime() === trans.date.getTime() &&
              existingTrans.source === trans.source
          );
          if (!isDuplicate) {
            unifieduserData.telegram.transitions.push(trans);
          }
        });
      }
    }

    let foundExistingConferenceToUpdate = false;
    for (let i = 0; i < unifieduserData.conferences.length; i++) {
      const existingConf = unifieduserData.conferences[i];
      if (
        existingConf.conference === newConferenceData.conference &&
        existingConf.paymentData?.status !== "paid"
      ) {
        unifieduserData.conferences[i] = {
          ...unifieduserData.conferences[i],
          ...newConferenceData,
        };
        targetConferenceIndex = i;
        foundExistingConferenceToUpdate = true;
        actionTaken = "updated";
        break;
      }
    }

    if (!foundExistingConferenceToUpdate) {
      unifieduserData.conferences.push(newConferenceData);
      targetConferenceIndex = unifieduserData.conferences.length - 1;
      actionTaken = "added";
    }

    await unifieduserData.save();
    console.log(`Existing user ${actionTaken}:`, unifieduserData._id);
  } else {
    // Пользователь не найден, создаем нового
    const newUserData = {
      fullName,
      phoneNumber,
      email,
      telegram,
      conferences: [newConferenceData],
    };
    unifieduserData = await unifiedusersCollection.create(newUserData);
    targetConferenceIndex = 0;
    console.log("New user created:", unifieduserData._id);
  }

  console.log("--- upsertunifieduser END ---");

  return {
    unifieduser: unifieduserData,
    conferenceIndex: targetConferenceIndex,
  };
};

export const getunifieduserById = async (id) => {
  if (!id) {
    throw createHttpError(400, "unifieduser ID is required");
  }
  const unifieduserData = await unifiedusersCollection.findById(id);
  if (!unifieduserData) {
    throw createHttpError(404, `unifieduser with id ${id} not found`);
  }
  return unifieduserData;
};

export const getAllunifiedusers = async () => {
  const unifiedusersData = await unifiedusersCollection.find();
  return unifiedusersData;
};

export const updateunifieduserById = async (unifieduserId, updatePayload) => {
  const updatedunifieduser = await unifiedusersCollection.findByIdAndUpdate(
    unifieduserId,
    updatePayload,
    { new: true }
  );

  if (!updatedunifieduser) {
    throw createHttpError(
      404,
      `unifieduser with id ${unifieduserId} not found`
    );
  }

  return updatedunifieduser;
};
