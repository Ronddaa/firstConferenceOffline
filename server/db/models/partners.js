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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const PartnersCollection = model("Partner", partnerSchema);
