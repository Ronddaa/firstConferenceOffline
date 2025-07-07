import { Schema, model } from "mongoose";
import {v4 as uuidv4} from 'uuid'

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

    // utm-метки
    utm_source: {
      type: String,
      default: "",
    },
    utm_medium: {
      type: String,
      default: "",
    },
    utm_campaign: {
      type: String,
      default: "",
    },
    ticketId: {
      type: String,
      default: () => uuidv4(),
      unique: true,
    },
    ticketUrl: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const InvoicesCollection = model("Invoice", invoiceSchema);