import { Router } from "express";
import createHttpError from "http-errors";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  createunifieduserController,
  getAllunifiedusersController,
  getunifieduserByIdController,
  sendTicketToUserController,
} from "../controllers/unifiedusers.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createunifieduserSchema } from "../validation/unifiedusers.js";
import { unifiedusersCollection } from "../db/models/unifiedusers.js";

const router = Router();

router.get(
  "/:unifieduserId/conferences/:conferenceId",
  async (req, res, next) => {
    try {
      const { unifieduserId, conferenceId } = req.params;

      const user = await unifiedusersCollection.findById(unifieduserId);

      if (!user) {
        throw createHttpError(404, `User with id ${unifieduserId} not found`);
      }

      // Mongoose метод .id() для поиска в поддокументах по их _id
      const conference = user.conferences.id(conferenceId);

      if (!conference) {
        throw createHttpError(
          404,
          `Conference with id ${conferenceId} not found for user ${unifieduserId}`
        );
      }

      res.status(200).json(conference);
    } catch (error) {
      console.error("Error fetching specific conference:", error);
      next(error);
    }
  }
);

router.get("/", ctrlWrapper(getAllunifiedusersController));

router.get("/:id", ctrlWrapper(getunifieduserByIdController));

router.post(
  "/", // Было "/unifiedusers"
  validateBody(createunifieduserSchema),
  ctrlWrapper(createunifieduserController)
);

router.post(
  "/sendTicket/:id", // Было "/unifiedusers/sendTicket/:id"
  ctrlWrapper(sendTicketToUserController)
);

export default router;
