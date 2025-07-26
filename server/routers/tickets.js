import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ticketsPath = resolve(__dirname, "../db/tickets.json");

const router = Router();

router.get("/:invoiceId", async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const tickets = JSON.parse(await fs.readFile(ticketsPath, "utf-8"));

    const ticket = tickets.find((t) => t.invoiceId === invoiceId);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json({
      brunchSelected: ticket.brunchSelected,
      promo: ticket.promo, // если нет — null
    });
  } catch (error) {
    console.error("Error reading tickets:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;