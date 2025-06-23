import { Router } from "express";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  createInvoiceController,
  getAllInvoicesController,
  sendTicketToUserController,
} from "../controllers/invoices.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createInvoiceSchema } from "../validation/invoices.js";

const router = Router();

router.get("/", ctrlWrapper(getAllInvoicesController));

router.post(
  "/",
  validateBody(createInvoiceSchema),
  ctrlWrapper(createInvoiceController)
);

router.post("/sendTicket", ctrlWrapper(sendTicketToUserController));

export default router;
