import { Router } from "express";

import unifiedusersRouter from "./unifiedusers.js";
import speakersRouter from "./speakers.js";
import partnersRouter from "./partners.js";
import promoRouter from "./promo.js";
import ticketsRouter from "./tickets.js";

const router = Router();

router.use("/unifiedusers", unifiedusersRouter);
router.use("/speakers", speakersRouter);
router.use("/partners", partnersRouter);
router.use("/promo", promoRouter);
router.use("/tickets", ticketsRouter);

export default router;
