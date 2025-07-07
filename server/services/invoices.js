import createHttpError from "http-errors";
import { InvoicesCollection } from "../db/models/invoices.js";

export const createInvoice = async (payload) => {
  const invoiceData = await InvoicesCollection.create(payload);
  return invoiceData;
};

export const getInvoiceById = async (id) => {
  if (!id) {
    throw createHttpError(400, "Invoice ID is required");
  }
  const invoiceData = await InvoicesCollection.findById(id);
  if (!invoiceData) {
    throw createHttpError(404, `Invoice with id ${id} not found`);
  }
  return invoiceData;
};

export const getAllInvoices = async () => {
  const invoicesData = await InvoicesCollection.find();
  return invoicesData;
};

export const updateInvoiceById = async (invoiceId, updatePayload) => {
  const updatedInvoice = await InvoicesCollection.findByIdAndUpdate(
    invoiceId,
    updatePayload,
    { new: true }
  );

  if (!updatedInvoice) {
    throw createHttpError(404, `Invoice with id ${invoiceId} not found`);
  }

  return updatedInvoice;
};
