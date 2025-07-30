import { Schema, model } from "mongoose";

const unifiedUserSchema = new Schema(
  {
    fullName: {
      firstName: String,
      lastName: String,
    },
    emails: [
      {
        value: String,
        verified: Boolean,
      },
    ],
    phones: [
      {
        value: String,
        verified: Boolean,
      },
    ],
    telegrams: [
      {
        username: String,
        chatId: String,
        verified: Boolean,
      },
    ],

    conferences: [
      {
        conference: { type: String, required: true }, // напр. 'warsawkod'

        type: { type: String }, // online / offline
        status: { type: String }, // paid / pending / failed

        ticketType: { type: String }, // напр. Luxe, Standard
        ticketsQuantity: { type: Number, default: 0 },
        brunch: { type: Boolean, default: false },

        promoCode: { type: String, default: "" },
        promoCodeBrunch: { type: String, default: "" },

        totalAmount: { type: Number, default: 0 }, // сумма покупки
        invoiceId: { type: String }, // из платежной системы

        formData: {
          email: String,
          phone: String,
          telegram: String,
        },

        utm: {
          utm_source: String,
          utm_medium: String,
          utm_campaign: String,
        },

        qrCode: String,
        registrationAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
    strict: false,
  }
);

export const unifiedusersCollection = model("UnifiedUser", unifiedUserSchema);
