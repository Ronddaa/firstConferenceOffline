import { Router } from "express";

import invoicesRouter from "./invoices.js";
import speakersRouter from "./speakers.js";
import partnersRouter from "./partners.js";
import promoPouter from './promo.js'
import helperUsersRouter from "./helperusers.js";

const router = Router();

router.use("/invoices", invoicesRouter);
router.use("/speakers", speakersRouter);
router.use("/partners", partnersRouter);
router.use("/promo", promoPouter);
router.use("/helperusers", helperUsersRouter);

export default router;