import { useState, useEffect } from "react";
import styles from "./SpeakersForm.module.css";
import sprite from "../../icons.svg";
import Modal from "react-modal";
import api from "../../../api/api";

export default function SpeakersForm({ isOpen, onClose }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [instagram, setInstagram] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const allFieldsFilled =
      fullName.trim() && phone.trim() && telegram.trim() && instagram.trim();
    setIsValid(Boolean(allFieldsFilled));
  }, [fullName, phone, telegram, instagram]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      const formData = {
        fullName,
        phone,
        telegram,
        instagram,
      };

      console.log(formData);
      await api.createSpeakerApplication(formData); // ждём завершения запроса

      // Очистка формы
      setFullName("");
      setPhone("");
      setTelegram("");
      setInstagram("");

      // Закрытие модального окна
      onClose();
    } catch (error) {
      console.log(error);
    }

    console.log("Form was sent!");
  };

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={styles.modalSpeakersForm}
      className={styles.modalSpeakersFormContent}
      closeTimeoutMS={400}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <svg
        className={styles.closeModalSpeakersForm}
        onClick={onClose}
        width={14}
        height={14}
      >
        <use xlinkHref={`${sprite}#icon-close`}></use>
      </svg>

      <h2 className={styles.titleSpeakersForm}>стати спікером</h2>

      <form className={styles.SpeakersForm} onSubmit={handleSubmit}>
        <input
          id="fullName"
          type="text"
          className={styles.inputSpeakersForm}
          placeholder="Ім'я, прізвище"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          id="phone"
          type="tel"
          className={styles.inputSpeakersForm}
          placeholder="Номер телефону"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          id="telegram"
          type="text"
          className={styles.inputSpeakersForm}
          placeholder="Нік Telegram"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          required
        />

        <input
          id="instagram"
          type="url"
          className={styles.inputSpeakersForm}
          placeholder="Посилання на Instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          required
        />

        <button
          type="submit"
          className={
            isValid
              ? styles.sendBtnSpeakersForm
              : `${styles.sendBtnSpeakersForm} ${styles.sendBtnSpeakersFormNoValid}`
          }
          disabled={!isValid}
        >
          Надіслати заявку
        </button>
      </form>
    </Modal>
  );
}
