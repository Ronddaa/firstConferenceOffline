import { SpeakersCollection } from "../db/models/speakers.js";
import { renderTemplate } from "../utils/renderTemplate.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createSpeaker = async (payload) => {
  // Создание нового спикера
  const speakerData = await SpeakersCollection.create(payload);

  // Рендерим email-шаблон с подстановкой имени
  const html = await renderTemplate("speakersApplicationEmail", {
    fullName: speakerData.fullName,
    phone: speakerData.phone,
    telegram: speakerData.telegram,
    instagram: speakerData.instagram,
  });

  // await sendEmail({
  //   to: "arinailienok@gmail.com",
  //   subject: "Заявка на долучення до спікерів",
  //   html,
  // });

  return speakerData;
};

export const getAllSpeakers = async () => {
  const speakersData = await SpeakersCollection.find();
  return speakersData;
};
