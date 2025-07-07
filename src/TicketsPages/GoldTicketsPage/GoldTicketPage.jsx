import styles from "./GoldTicketPage.module.css";
import logo from "../GoldTicketLogo.svg";
import TicketsIMG from "../TicketsIMG.webp";
import ourDress1 from "../ourDress1.webp";
import ourDress2 from "../ourDress2.webp";
import ourDress3 from "../ourDress3.webp";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function GoldTicketPage() {
  const { ticketId } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTicketData() {
      try {
        const res = await fetch(`/tickets/${ticketId}`); // ✅ путь поправлен
        const data = await res.json();
        setInvoice(data);
      } catch (error) {
        console.log("error with loading ticket: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTicketData();
  }, [ticketId]);

  useEffect(() => {
    if (loading || !invoice) return;

    const canvas = document.getElementById("qrCodeCanvas");
    if (!canvas) {
      console.warn("Canvas not found");
      return;
    }

    QRCode.toCanvas(canvas, invoice.ticketUrl, { width: 200 }, (err) => {
      if (err) console.error("QR code error:", err);
      else console.log("QR code rendered successfully");
    });
  }, [invoice, loading]);

  return (
    <section className={styles.GoldTicketPage}>
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
      <h1 className={styles.titleGoldTicket}>квиток для тарифу «gold»</h1>
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
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
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
    </section>
  );
}
