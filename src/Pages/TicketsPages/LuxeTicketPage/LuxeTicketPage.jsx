import styles from "./LuxeTicketPage.module.css";
import logo from "../LuxeTicketLogo.svg";
import TicketsIMG from "../TicketsIMG.webp";
import ourDress1 from "../ourDress1.webp";
import ourDress2 from "../ourDress2.webp";
import ourDress3 from "../ourDress3.webp";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function LuxeTicketPage() {
  const { invoiceId } = useParams();
  const [brunchSelected, setBrunchSelected] = useState(null);
  const [tariff, setTariff] = useState(null);
  const [generatedPromo, setGeneratedPromo] = useState("");

  // Генерация уникального промокода
  const generatePromoCode = (tariff) => {
    const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `BRUNCH${tariff?.toUpperCase()}-${randomPart}`;
  };

  useEffect(() => {
    if (!invoiceId) return;

    // Подгружаем данные билета
    const fetchTicketData = async () => {
      try {
        const res = await fetch(`/api/tickets/${invoiceId}`);
        const data = await res.json();

        setBrunchSelected(data.brunchSelected);
        setTariff(data.tariff);

        // Если бранч не куплен, генерируем и отправляем промокод
        if (!data.brunchSelected && data.tariff) {
          const promo = generatePromoCode(data.tariff);
          setGeneratedPromo(promo);

          // Сохраняем промокод на сервере
          await fetch("/api/promo/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code: promo,
              tariff: data.tariff,
              fixedPrice: data.tariff === "LUXE" ? 4250 : 1300, // или другая логика
              used: false,
            }),
          });
        }
      } catch (err) {
        console.error("Error loading ticket:", err);
      }
    };

    fetchTicketData();
  }, [invoiceId]);

  // Генерация QR-кода
  useEffect(() => {
    if (!invoiceId) return;

    const canvas = document.getElementById("qrCodeCanvas");
    if (!canvas) return;

    const qrCodeLink = `https://admin.women.place/check/${invoiceId}`;
    QRCode.toCanvas(
      canvas,
      qrCodeLink,
      {
        width: 200,
        color: {
          dark: "#FFFFFF",
          light: "#FFFFFF00",
        },
      },
      (err) => {
        if (err) console.error("QR code error:", err);
      }
    );
  }, [invoiceId]);

  return (
    <section className={styles.LuxeTicketPage}>
      <img
        className={styles.logo}
        src={logo}
        alt="logo"
        width={328}
        height={83}
      />
      <p className={styles.textUnderlogo}>
        Преміальна українсько-європейська <br /> конференція у форматі
        спікер-шоу
      </p>
      <h1 className={styles.titleGoldTicket}>квиток для тарифу «luxe»</h1>
      <img
        className={styles.TicketsIMG}
        src={TicketsIMG}
        alt="Ivent Date"
        width={585}
        height={305}
      />
      <h2 className={styles.dressCode}>Дрес-код:</h2>
      <ul className={styles.wrapperNameColor}>
        <li>жовтий</li>
        <li>пастельний блакитний</li>
        <li>білий</li>
      </ul>
      <ul className={styles.wrapperColors}>
        {[...Array(9)].map((_, idx) => (
          <li key={idx}></li>
        ))}
      </ul>
      <p className={styles.colorOurIvent}>кольори нашого заходу</p>
      <ul className={styles.wrapperOurDressIMG}>
        <li>
          <img src={ourDress1} alt="dress" width={147} height={143} />
        </li>
        <li>
          <img src={ourDress2} alt="dress" width={147} height={143} />
        </li>
        <li>
          <img src={ourDress3} alt="dress" width={147} height={143} />
        </li>
      </ul>
      <p className={styles.scanMe}>*заскануй код на конференції</p>
      <canvas id="qrCodeCanvas" className={styles.qrCodeHere}></canvas>

      {/* 💬 Сообщение о бранче */}
      {brunchSelected === true && (
        <p className={styles.brunchInfo}>Бронювання на бранч MGVC включено</p>
      )}
      {brunchSelected === false && generatedPromo && (
        <p className={styles.brunchInfo}>
          Ваша знижка на бранч по промокоду: <strong>{generatedPromo}</strong>
        </p>
      )}
    </section>
  );
}
