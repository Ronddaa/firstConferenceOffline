import { useState, useEffect } from "react";
import styles from "./HelperFormUsers.module.css";
import sprite from "../../icons.svg";
import Modal from "react-modal";
import api from "../../../api/api";
import { sendLeadToMeta } from "../../../utils/sendLeadToMeta";
import helperIMG from "./helperIMG.webp";

export default function HelperFormUsers({ isOpen, onClose }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(""); // Добавлено состояние для email
  const [telegram, setTelegram] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [utmParams, setUtmParams] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
    });
  }, []);

  useEffect(() => {
    // Обновлена валидация, чтобы включить email
    const allFieldsFilled =
      fullName.trim() && phone.trim() && email.trim() && telegram.trim();
    setIsValid(Boolean(allFieldsFilled));
  }, [fullName, phone, email, telegram]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      const cleanTelegram = telegram.startsWith("@")
        ? telegram.substring(1)
        : telegram;

      await api.createUnifieduser({
        fullName: {
          firstName: fullName.split(" ")[0] || "",
          lastName: fullName.split(" ").slice(1).join(" ") || "",
        },
        phoneNumber: phone,
        email: email,
        telegram: {
          id: "",
          userName: cleanTelegram || "",
          firstName: "",
          languageCode: "",
          phone: "",
          isPremium: false,
          source: [],
          transitions: [],
        },
        conferences: [
          {
            conference: `warsawkod ORDER`,
            type: "offline",
            ticketType: "helper",
            ticketsQuantity: 1,
            totalAmount: 0,
            takeBrunch: false,
            paymentData: { invoiceId: "", status: "pending" },
            promoCode: "",
            utmMarks: [
              {
                source: utmParams.utm_source || "",
                medium: utmParams.utm_medium || "",
                campaign: utmParams.utm_campaign || "",
              },
            ],
          },
        ],
      });

      sendLeadToMeta({
        formType: "helperFormUsers",
        phone,
        name: fullName,
        email, // Передаем email в Meta
        telegram,
      });

      setFullName("");
      setPhone("");
      setEmail(""); // Очищаем email
      setTelegram("");
      onClose();
    } catch (error) {
      console.error("Не вдалося зберегти заявку:", error);
    }

    console.log("Helper form was saved to DB!");
  };

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={styles.modalHelperFormUsers}
      className={styles.modalHelperFormUsersContent}
      closeTimeoutMS={400}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <svg
        className={styles.closeModalHelperFormUsers}
        onClick={onClose}
        width={14}
        height={14}
      >
        <use xlinkHref={`${sprite}#icon-close`}></use>
      </svg>

      <form className={styles.HelperFormUsers} onSubmit={handleSubmit}>
        <h2 className={styles.titleHelperFormUsers}>
          Ми раді, що ви зацікавилися нашим проєктом!
        </h2>
        <p className={styles.textHelper}>
          Залиште свої контакти, і ми звʼяжемось з вами, щоб допомогти з вибором
          тарифу та відповісти на всі запитання!
        </p>

        <input
          id="fullName"
          type="text"
          className={styles.inputHelperFormUsers}
          placeholder="Ім'я, прізвище"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          id="phone"
          type="tel"
          className={styles.inputHelperFormUsers}
          placeholder="Номер телефону"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        {/* Добавлено поле для email */}
        <input
          id="email"
          type="email"
          className={styles.inputHelperFormUsers}
          placeholder="Електронна пошта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          id="telegram"
          type="text"
          className={styles.inputHelperFormUsers}
          placeholder="Нік Telegram"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          required
        />

        <button
          type="submit"
          className={
            isValid
              ? styles.sendBtnHelperFormUsers
              : `${styles.sendBtnHelperFormUsers} ${styles.sendBtnHelperFormUsersNoValid}`
          }
          disabled={!isValid}
        >
          Надіслати
        </button>
      </form>
      <img className={styles.helperIMG} src={helperIMG} alt="warsaw" />
    </Modal>
  );
}
