import createHttpError from "http-errors";
import { unifiedusersCollection } from "../db/models/unifiedusers.js";

export const upsertunifieduser = async (payload) => {
  console.log("--- upsertunifieduser START ---");
  console.log(
    "Payload received in upsertunifieduser:",
    JSON.stringify(payload, null, 2)
  );
  const { user, conferences } = payload;
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
    if (unifieduserData) {
      console.log(
        "Existing user's conferences BEFORE update logic:",
        JSON.stringify(unifieduserData.conferences, null, 2)
      );
    }
  }

  const newConferenceData = conferences[0];
  let targetConferenceIndex; // Индекс конференции, которую мы обновили или добавили
  let actionTaken = "added"; // Для логирования: 'updated' или 'added'

  if (unifieduserData) {
    // Обновление основных полей пользователя и Telegram
    unifieduserData.fullName = {
      firstName: fullName.firstName || unifieduserData.fullName.firstName || "",
      lastName: fullName.lastName || unifieduserData.fullName.lastName || "",
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

    // --- ЛОГИКА ОБРАБОТКИ КОНФЕРЕНЦИЙ ---
    let foundExistingConferenceToUpdate = false;

    for (let i = 0; i < unifieduserData.conferences.length; i++) {
      const existingConf = unifieduserData.conferences[i];
      // Условие для ОБНОВЛЕНИЯ: та же конференция И НЕ ОПЛАЧЕНА
      // Это позволяет перезаписать "висящий" неоплаченный заказ на ту же конференцию
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
        console.log(
          `Updating existing non-paid conference "${newConferenceData.conference}" for user ${unifieduserData._id} at index ${i}`
        );
        break; // Важно выйти из цикла после обновления
      }
    }

    if (!foundExistingConferenceToUpdate) {
      // Если не нашли подходящую для обновления (т.е. все существующие оплачены или это другая конференция), добавляем новую
      unifieduserData.conferences.push(newConferenceData);
      targetConferenceIndex = unifieduserData.conferences.length - 1; // Индекс только что добавленной конференции
      actionTaken = "added";
      console.log(
        `Adding new conference "${newConferenceData.conference}" for user ${unifieduserData._id} at index ${targetConferenceIndex}`
      );
    }
    // --- КОНЕЦ ЛОГИКИ ОБРАБОТКИ КОНФЕРЕНЦИЙ ---

    console.log(
      "Unified user data BEFORE save (after conference logic):",
      JSON.stringify(unifieduserData, null, 2)
    );
    await unifieduserData.save();
    console.log(`Existing user ${actionTaken}:`, unifieduserData._id);
  } else {
    // Пользователь не найден, создаем нового
    const newUserData = {
      ...user,
      conferences: [newConferenceData],
    };
    unifieduserData = await unifiedusersCollection.create(newUserData);
    targetConferenceIndex = 0; // Для нового пользователя это всегда будет первый элемент
    console.log("New user created:", unifieduserData._id);
  }

  console.log(
    "Final unified user data AFTER upsert:",
    JSON.stringify(unifieduserData, null, 2)
  );
  console.log("--- upsertunifieduser END ---");

  // Возвращаем объект пользователя и индекс конференции, которую нужно обновить paymentData
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
