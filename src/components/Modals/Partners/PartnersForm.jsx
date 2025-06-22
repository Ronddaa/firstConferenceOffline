import { useState } from "react";
import Modal from "react-modal";
import styles from "./Partners.module.css";
import sprite from "../../icons.svg";
import api from "../../../api/api";

export default function PartnersForm({ isOpen, onClose }) {
  // Начальное состояние всех полей формы
  const initialState = {
    companyName: "",
    contactPerson: "",
    contactInfo: "", // email или телефон
    telegramNick: "",
    instagramLink: "",
  };

  // Состояние формы, то что отправляем в БД
  const [formData, setFormData] = useState(initialState);

  const isValidContactInfo = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s\-()]{7,}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const isValidUrl = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const isFormValid =
    formData.companyName.trim() !== "" &&
    formData.contactPerson.trim() !== "" &&
    isValidContactInfo(formData.contactInfo.trim()) &&
    formData.telegramNick.trim() !== "" &&
    isValidUrl(formData.instagramLink.trim());

  // Обработка изменения значений в полях формы
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Обработка закрытия модального окна и сброс полей
  const handleClose = () => {
    setFormData(initialState); // очищаем все поля
    onClose(); // закрываем модалку
  };

  // Отправка формы — временно отключена (добавим позже MongoDB)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      console.log(formData);
      api.createPartnerApplication(formData);
    } catch (error) {
      console.log(error);
    }
    // Тут будет логика отправки формы в MongoDB
    console.log("Отправлено:", formData);
    handleClose(); // закрыть и сбросить форму
  };

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={styles.modalPartnersForm}
      className={styles.modalPartnersFormContent}
      closeTimeoutMS={400}
      onRequestClose={handleClose}
      ariaHideApp={false}
    >
      {/* Кнопка закрытия */}
      <svg
        className={styles.closeModalPartnersForm}
        onClick={handleClose}
        width={14}
        height={14}
      >
        <use xlinkHref={`${sprite}#icon-close`}></use>
      </svg>

      {/* Заголовок */}
      <h2 className={styles.titlePartnersForm}>стати партнером</h2>

      {/* Форма */}
      <form className={styles.PartnersForm} onSubmit={handleSubmit}>
        <input
          id="companyName"
          type="text"
          className={styles.inputPartnersForm}
          placeholder="Назва компанії"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <input
          id="contactPerson"
          type="text"
          className={styles.inputPartnersForm}
          placeholder="Контактна особа"
          value={formData.contactPerson}
          onChange={handleChange}
          required
        />
        <input
          id="contactInfo"
          type="text"
          className={styles.inputPartnersForm}
          placeholder="Email / Телефон"
          value={formData.contactInfo}
          onChange={handleChange}
          required
        />
        <input
          id="telegramNick"
          type="text"
          className={styles.inputPartnersForm}
          placeholder="Нік Telegram"
          value={formData.telegramNick}
          onChange={handleChange}
          required
        />
        <input
          id="instagramLink"
          type="url"
          className={styles.inputPartnersForm}
          placeholder="Посилання на Instagram сторінку бренду"
          value={formData.instagramLink}
          onChange={handleChange}
          required
        />

        {/* Кнопка отправки с динамическими стилями */}
        <button
          className={
            isFormValid
              ? styles.sendBtnPartnersForm
              : `${styles.sendBtnPartnersForm} ${styles.sendBtnPartnersFormNoValid}`
          }
          type="submit"
          disabled={!isFormValid}
        >
          Надіслати заявку
        </button>
      </form>
    </Modal>
  );
}
