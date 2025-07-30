import { unifiedusersCollection } from "../db/models/unifiedusers.js";
import {
  createunifieduser,
  getAllunifiedusers,
  getunifieduserById,
} from "../services/unifiedusers.js";
import { sendTicket } from "../utils/sendTicket.js";

export const createunifieduserController = async (req, res) => {
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
  const unifieduser = await createunifieduser(payload);
  res.status(201).json({
    status: 201,
    message: "Successfully created an unifieduser!",
    data: unifieduser,
  });
};

export const getAllunifiedusersController = async (req, res) => {
  const unifieduser = await getAllunifiedusers();
  res.status(200).json({
    status: 200,
    message: "unifiedusers was successfully found!",
    data: unifieduser,
  });
};

export const getunifieduserByIdController = async (req, res) => {
  const unifieduser = await getunifieduserById(req.params.id);
  res.status(200).json({
    status: 200,
    message: "unifieduser was successfully found!",
    data: unifieduser,
  });
};

export const sendTicketToUserController = async (req, res) => {
  const unifieduser = await unifiedusersCollection.findById(req.params.id);
  const ticketName = unifieduser.purchase.tariffs[0].toLowerCase() + "Ticket";
  const response = await sendTicket(unifieduser, ticketName);
  res.status(200).json({
    status: 200,
    message: "Ticket was successfully sent!",
    data: response,
  });
};
