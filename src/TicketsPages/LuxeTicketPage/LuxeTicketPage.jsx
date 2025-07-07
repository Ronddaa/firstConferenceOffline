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

  useEffect(() => {
    if (!invoiceId) return;

    const canvas = document.getElementById("qrCodeCanvas");
    if (!canvas) {
      console.warn("Canvas not found");
      return;
    }

    // link to the admin panel, where security quard will check
    // ticket data
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
        else console.log("QR code rendered successfully");
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
