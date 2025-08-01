import { useState, useEffect } from "react";
import styles from "./HelperFormUsers.module.css";
import sprite from "../../icons.svg";
import Modal from "react-modal";
import api from "../../../api/api";
import { sendLeadToMeta } from "../../../utils/sendLeadToMeta"; // ✅ Импорт функции для отправки события в Meta

export default function HelperFormUsers({ isOpen, onClose }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
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
    const allFieldsFilled = fullName.trim() && phone.trim() && telegram.trim();
    setIsValid(Boolean(allFieldsFilled));
  }, [fullName, phone, telegram]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      const dataToSend = {
        fullName,
        phone,
        telegram,
        utmParams,
      };

      // ✅ ИЗМЕНЕНИЕ: Отправляем данные на новый API-эндпоинт на вашем сервере
      await api.submitHelperUserFormApplication(dataToSend);

      // 🔹 Отправка события в Meta (можно оставить как есть)
      sendLeadToMeta({
        formType: "helperFormUsers",
        phone,
        name: fullName,
        telegram,
      });

      // Сброс полей
      setFullName("");
      setPhone("");
      setTelegram("");

      onClose();
    } catch (error) {
      console.error("Не вдалося надіслати заявку:", error);
    }

    console.log("Form was sent!");
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

      <h2 className={styles.titleHelperFormUsers}>залиш свої контакти</h2>
      <p className={styles.textHelper}>
        ми звʼяжемось з тобою, щоб допомогти обрати тариф та відповісти на всі
        запитання!
      </p>

      <form className={styles.HelperFormUsers} onSubmit={handleSubmit}>
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

        <input
          id="telegram"
          type="text"
          className={styles.inputHelperFormUsers}
          placeholder="Нік Telegram"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
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
          Надіслати заявку
        </button>
      </form>
    </Modal>
  );
}
