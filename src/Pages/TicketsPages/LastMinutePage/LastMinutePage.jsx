import styles from "./LastMinutePage.module.css";
import logo from "../PremiumTicketLogo.svg";
import TicketsIMG from "../TicketsIMG.webp";
import ourDress1 from "../ourDress1.webp";
import ourDress2 from "../ourDress2.webp";
import ourDress3 from "../ourDress3.webp";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"; // Добавляем useState
import QRCode from "qrcode";

export default function LastMinutePage() {
  // Получаем оба ID из параметров URL
  const { unifieduserId, conferenceId } = useParams();
  const [ticketDetails, setTicketDetails] = useState(null); // Состояние для хранения данных билета

  useEffect(() => {
    // Проверяем наличие обоих ID
    if (!unifieduserId || !conferenceId) {
      console.warn("Missing unifieduserId or conferenceId in URL parameters.");
      return;
    }

    // --- Шаг 1: Загрузка данных о билете ---
    const fetchTicketData = async () => {
      try {
        // Здесь вам нужно сделать запрос к вашему бэкенду,
        // чтобы получить конкретную конференцию для этого пользователя.
        // Пример API-эндпоинта: GET /api/users/:unifieduserId/conferences/:conferenceId
        // или GET /api/tickets/:conferenceId (если conferenceId сам по себе уникален)
        const response = await fetch(
          `/api/users/${unifieduserId}/conferences/${conferenceId}`
        ); // Замените на ваш фактический эндпоинт
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Ожидаем, что бэкенд вернет объект конференции
        setTicketDetails(data); // Сохраняем данные билета в состоянии
        console.log("Ticket data fetched:", data);

        // --- Шаг 2: Генерация QR-кода после получения данных ---
        const canvas = document.getElementById("qrCodeCanvas");
        if (!canvas) {
          console.warn("Canvas not found");
          return;
        }

        // QR-код теперь будет содержать оба ID
        // Это позволит админ-панели точно знать, какой конкретно билет проверяется
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
      } catch (error) {
        console.error("Failed to fetch ticket data:", error);
        // Можно показать сообщение об ошибке пользователю
      }
    };

    fetchTicketData();
  }, [unifieduserId, conferenceId]); // Зависимости useEffect

  // Добавьте условный рендеринг, пока данные загружаются
  if (!ticketDetails) {
    return (
      <section className={styles.LastMinutePage}>
        Завантаження квитка...
      </section>
    );
  }

  // Используем данные из ticketDetails для отображения информации о билете
  return (
    <section className={styles.LastMinutePage}>
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
      <h1 className={styles.titleGoldTicket}>квиток для тарифу «premium»</h1>
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
