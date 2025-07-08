import { Schema, model } from "mongoose";

const speakerSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    telegram: {
      type: String,
      required: true,
    },
    instagram: {
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

export const SpeakersCollection = model("Speaker", speakerSchema);
