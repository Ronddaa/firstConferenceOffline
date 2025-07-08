import { Schema, model } from "mongoose";

const partnerSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    contactInfo: {
      type: String,
      required: true,
    },
    telegramNick: {
      type: String,
      required: true,
    },
    instagramLink: {
      type: String,
      required: true,
    },
    // utm-метки
    utmMarks: {
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
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const PartnersCollection = model("Partner", partnerSchema);
