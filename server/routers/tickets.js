import { Router } from "express";
import { InvoicesCollection } from "../db/models/invoices.js";

const router = Router();

router.get("/:invoiceId", async (req, res) => {
  try {
    const { invoiceId } = req.params;

    // Ищем по paymentData.invoiceId
    const ticket = await InvoicesCollection.findOne({
      "paymentData.invoiceId": invoiceId,
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