import { PartnersCollection } from "../db/models/partners.js";
import { renderTemplate } from "../utils/renderTemplate.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createPartner = async (payload) => {
  const partnerData = await PartnersCollection.create(payload);

  // Рендерим HTML шаблон письма
  const emailHtml = await renderTemplate("partnersApplicationEmail", {
    companyName: partnerData.companyName,
    contactPerson: partnerData.contactPerson,
    contactInfo: partnerData.contactInfo,
    telegramNick: partnerData.telegramNick,
    instagramLink: partnerData.instagramLink,
  });

  // Отправляем email
  // await sendEmail({
  //   to: "arinailienok@gmail.com", // Укажи email, на который должна приходить заявка
  //   subject: "Нова заявка на партнерство",
  //   html: emailHtml,
  // });

  return partnerData;
};

export const getAllPartners = async () => {
  const partnersData = await PartnersCollection.find();
  return partnersData;
};
