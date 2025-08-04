import styles from "./LuxeTicketPage.module.css";
import logo from "../LuxeTicketLogo.svg";
import TicketsIMG from "../TicketsIMG.webp";
import ourDress1 from "../ourDress1.webp";
import ourDress2 from "../ourDress2.webp";
import ourDress3 from "../ourDress3.webp";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import api from "../../../api/api"; // Импортируем API для получения данных о конференции

export default function LuxeTicketPage() {
  const { unifieduserId, conferenceId } = useParams();
  const [ticketDetails, setTicketDetails] = useState(null); // --- Первый useEffect: ЗАГРУЗКА ДАННЫХ --- // Этот хук отвечает только за асинхронную загрузку данных с сервера. // Он срабатывает при первом рендере и при изменении ID пользователя/конференции.

  useEffect(() => {
    if (!unifieduserId || !conferenceId) {
      console.warn("Missing unifieduserId or conferenceId in URL parameters.");
      return;
    }

    const fetchTicketData = async () => {
      try {
        const data = await api.getSpecificConference(
          unifieduserId,
          conferenceId
        ); // После получения данных обновляем состояние. // Это запускает перерисовку компонента.
        setTicketDetails(data);
        console.log("Ticket data fetched:", data);
      } catch (error) {
        console.error("Failed to fetch ticket data:", error);
      }
    };

    fetchTicketData();
  }, [unifieduserId, conferenceId]); // --- Второй useEffect: ГЕНЕРАЦИЯ QR-КОДА --- // Этот хук срабатывает только тогда, когда `ticketDetails` перестанет быть `null`. // К этому моменту компонент уже отрисован, и <canvas> существует.

  useEffect(() => {
    if (ticketDetails) {
      const canvas = document.getElementById("qrCodeCanvas");
      if (!canvas) {
        // Это сообщение теперь вряд ли появится,
        // но оставляем для надежности
        console.warn("Canvas not found after ticket data loaded.");
        return;
      } // Генерируем QR-код, так как все необходимые данные и элементы уже на месте.
      const qrCodeLink = `https://admin.women.place/check/${unifieduserId}/${conferenceId}`;
      QRCode.toCanvas(
        canvas,
        qrCodeLink,
        {
          width: 200,
          color: {
            dark: "#1B2021",
            light: "#FFFFFF00",
          },
        },
        (err) => {
          if (err) console.error("QR code error:", err);
          else console.log("QR code rendered successfully for:", qrCodeLink);
        }
      );
    }
  }, [ticketDetails, unifieduserId, conferenceId]); // Условный рендеринг: пока `ticketDetails` равен null, // отображаем сообщение о загрузке.

  if (!ticketDetails) {
    return (
      <section className={styles.PremiumPage}>Завантаження квитка...</section>
    );
  } // Когда данные загружены, отображаем основной контент с <canvas>.

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
    </section>
  );
}
