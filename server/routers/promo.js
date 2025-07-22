import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const promoPath = resolve(__dirname, "../db/promoCodes.json");

const router = Router();

router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const promoCodes = JSON.parse(await fs.readFile(promoPath, "utf-8"));

    const promo = promoCodes.find(
      (p) => p.code.toLowerCase() === code.toLowerCase() && !p.used
    );

    if (!promo) {
      return res.status(404).json({ valid: false });
    }

    res.json({
      valid: true,
      fixedPrice: promo.fixedPrice,
      tariff: promo.tariff,
    });
  } catch (error) {
    console.error("Error reading promo codes:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;