import { InvoicesCollection } from "../db/models/invoices.js";
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
} from "../services/invoices.js";
import { sendTicket } from "../utils/sendTicket.js";

export const createInvoiceController = async (req, res) => {
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
  const invoice = await createInvoice(payload);
  res.status(201).json({
    status: 201,
    message: "Successfully created an invoice!",
    data: invoice,
  });
};

export const getAllInvoicesController = async (req, res) => {
  const invoice = await getAllInvoices();
  res.status(200).json({
    status: 200,
    message: "Invoices was successfully found!",
    data: invoice,
  });
};

export const getInvoiceByIdController = async (req, res) => {
  const invoice = await getInvoiceById(req.params.id);
  res.status(200).json({
    status: 200,
    message: "Invoice was successfully found!",
    data: invoice,
  });
};

export const sendTicketToUserController = async (req, res) => {
  const invoice = await InvoicesCollection.findById(req.params.id);
  const ticketName = invoice.purchase.tariffs[0].toLowerCase() + "Ticket";
  const response = await sendTicket(invoice, ticketName);
  res.status(200).json({
    status: 200,
    message: "Ticket was successfully sent!",
    data: response,
  });
};
