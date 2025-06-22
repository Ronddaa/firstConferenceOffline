import { Router } from "express";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";

import { validateBody } from "../middlewares/validateBody.js";
import {
  createPartnerController,
  getAllPartnersController,
} from "../controllers/partners.js";
import { createPartnerSchema } from "../validation/partners.js";

const router = Router();

router.get("/", ctrlWrapper(getAllPartnersController));

router.post(
  "/",
  validateBody(createPartnerSchema),
  ctrlWrapper(createPartnerController)
);

export default router;
