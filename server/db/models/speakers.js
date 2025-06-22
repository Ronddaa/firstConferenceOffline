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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const SpeakersCollection = model("Speaker", speakerSchema);
