import { createPartner, getAllPartners } from "../services/partners.js";

export const createPartnerController = async (req, res) => {
  const payload = req.body;

  //   try {
  // Проверка, существует ли запись с таким userId
  // const existingUserData = await getUserDataById(payload.id);
  // if (existingUserData) {
  //   return res.status(409).json({
  //     status: 409,
  //     message: "UserData already exists for this user.",
  //     data: existingUserData, // Можно вернуть существующие данные
  //   });
  // }
  // } catch (error) {
  //     res.status(500).json({
  //       status: 500,
  //       message: "An error occurred while creating user.",
  //       error: error.message,
  //     });
  //   }

  // Создание новой записи
  const user = await createPartner(payload);
  res.status(201).json({
    status: 201,
    message: "Successfully created a partner!",
    data: user,
  });
};

export const getAllPartnersController = async (req, res) => {
  const user = await getAllPartners();
  res.status(200).json({
    status: 200,
    message: "Partners was successfully found!",
    data: user,
  });
};
