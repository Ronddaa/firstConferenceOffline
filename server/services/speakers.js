import createHttpError from "http-errors";
import { SpeakersCollection } from "../db/models/speakers.js";
import { renderTemplate } from "../utils/renderTemplate.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createSpeaker = async (payload) => {
  // Проверка на дубликат телефона
  // const isPhoneNumberExist = await SpeakersCollection.findOne({
  //   phoneNumber: payload.phoneNumber,
  // });

  // if (isPhoneNumberExist) {
  //   throw createHttpError(
  //     409,
  //     `Phone Number ${payload.phoneNumber} is already taken`
  //   );
  // }

  // Создание нового спикера
  const speakerData = await SpeakersCollection.create(payload);

  // Рендерим email-шаблон с подстановкой имени
  const html = await renderTemplate("1", {
    fullName: speakerData.fullName,
    phone: speakerData.phone,
    telegram: speakerData.telegram,
    instagram: speakerData.instagram,
  });

  await sendEmail({
    to: "nikiatanik@gmail.com",
    subject: "Заявка на долучення до спікерів",
    html,
  });

  return speakerData;
};

export const getAllSpeakers = async () => {
  const speakersData = await SpeakersCollection.find();
  return speakersData;
};
