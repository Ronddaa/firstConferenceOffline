import { Router } from "express";
import { InvoicesCollection } from "../db/models/invoices.js";

const router = Router();

// GET /tickets/:ticketId — получить информацию о билете
router.get("/:ticketId", async (req, res) => {
  const { ticketId } = req.params;

  try {
    const invoice = await InvoicesCollection.findOne({ ticketId });

    if (!invoice) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(invoice);
  } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
