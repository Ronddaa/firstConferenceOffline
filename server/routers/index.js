import { Router } from "express";

import invoicesRouter from "./invoices.js";
import speakersRouter from "./speakers.js";
import partnersRouter from "./partners.js";

const router = Router();

router.use("/invoices", invoicesRouter);
router.use("/speakers", speakersRouter);
router.use("/partners", partnersRouter);

export default router;
