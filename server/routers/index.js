import { Router } from "express";

import invoicesRouter from "./invoices.js";
import speakersRouter from "./speakers.js";
import partnersRouter from "./partners.js";
import promoRouter from './promo.js'
import helperUsersRouter from "./helperusers.js";
import ticketsRouter from './tickets.js'

const router = Router();

router.use("/invoices", invoicesRouter);
router.use("/speakers", speakersRouter);
router.use("/partners", partnersRouter);
router.use("/promo", promoRouter);
router.use("/helperusers", helperUsersRouter);
router.use("/tickets", ticketsRouter)

export default router;