import { Schema, model } from "mongoose";

const invoiceSchema = new Schema(
  {
    user: {
      fullName: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      telegramNick: {
        type: String,
        required: true,
      },
    },
    purchase: {
      tariffs: {
        type: [String],
        required: true,
      },
      ticketsQuantity: {
        type: Number,
        required: true,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
    },
    paymentData: {
      invoiceId: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "paid", "failed"],
        required: true,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const InvoicesCollection = model("Invoice", invoiceSchema);
