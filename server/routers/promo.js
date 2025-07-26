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

router.post("/add", async (req, res) => {
  try {
    const newPromo = req.body;

    if (!newPromo?.code || !newPromo?.tariff || !newPromo?.fixedPrice) {
      return res.status(400).json({ error: "Missing promo fields" });
    }

    const promoCodes = JSON.parse(await fs.readFile(promoPath, "utf-8"));

    // Проверка на уникальность кода
    const existing = promoCodes.find(p => p.code === newPromo.code);
    if (existing) {
      return res.status(409).json({ error: "Promo code already exists" });
    }

    promoCodes.push({
      ...newPromo,
      used: false,
    });

    await fs.writeFile(promoPath, JSON.stringify(promoCodes, null, 2), "utf-8");

    res.status(201).json({ message: "Promo code saved" });
  } catch (error) {
    console.error("Error saving promo code:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;