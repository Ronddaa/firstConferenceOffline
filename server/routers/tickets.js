import { Router } from "express";
import { unifiedusersCollection } from "../db/models/unifiedusers.js";

const router = Router();

router.get("/:unifieduserId", async (req, res) => {
  try {
    const { unifieduserId } = req.params;

    // Ищем по paymentData.unifieduserId
    const ticket = await unifiedusersCollection.findOne({
      "paymentData.unifieduserId": unifieduserId,
    });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json({
      brunchSelected: ticket.purchase.brunchSelected || false,
      promo: ticket.user.promoCode || null,
    });
  } catch (error) {
    console.error("Error fetching ticket from MongoDB:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
