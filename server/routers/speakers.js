import { Router } from "express";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";

import { validateBody } from "../middlewares/validateBody.js";
import { createSpeakerSchema } from "../validation/speakers.js";
import {
  createSpeakerController,
  getAllSpeakersController,
} from "../controllers/speakers.js";

const router = Router();

router.get("/", ctrlWrapper(getAllSpeakersController));

router.post(
  "/",
  validateBody(createSpeakerSchema),
  ctrlWrapper(createSpeakerController)
);

export default router;
