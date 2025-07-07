import { Router } from "express";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  createInvoiceController,
  getAllInvoicesController,
  getInvoiceByIdController,
  sendTicketToUserController,
} from "../controllers/invoices.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createInvoiceSchema } from "../validation/invoices.js";

const router = Router();

router.get("/", ctrlWrapper(getAllInvoicesController));

router.get("/:id", ctrlWrapper(getInvoiceByIdController));

router.post(
  "/",
  validateBody(createInvoiceSchema),
  ctrlWrapper(createInvoiceController)
);

router.post("/sendTicket/:id", ctrlWrapper(sendTicketToUserController));

export default router;
