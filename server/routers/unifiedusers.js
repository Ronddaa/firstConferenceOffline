import { Router } from "express";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  createunifieduserController,
  getAllunifiedusersController,
  getunifieduserByIdController,
  sendTicketToUserController,
} from "../controllers/unifiedusers.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createunifieduserSchema } from "../validation/unifiedusers.js";

const router = Router();

router.get("/", ctrlWrapper(getAllunifiedusersController));

router.get("/:id", ctrlWrapper(getunifieduserByIdController));

router.post(
  "/",
  validateBody(createunifieduserSchema),
  ctrlWrapper(createunifieduserController)
);

router.post("/sendTicket/:id", ctrlWrapper(sendTicketToUserController));

export default router;
