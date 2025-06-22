import { createSpeaker, getAllSpeakers } from "../services/speakers.js";

export const createSpeakerController = async (req, res) => {
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
  const user = await createSpeaker(payload);
  res.status(201).json({
    status: 201,
    message: "Successfully created a speaker!",
    data: user,
  });
};

export const getAllSpeakersController = async (req, res) => {
  const user = await getAllSpeakers();
  res.status(200).json({
    status: 200,
    message: "Speakers was successfully found!",
    data: user,
  });
};
