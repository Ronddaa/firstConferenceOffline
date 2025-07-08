import { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./Partners.module.css";
import sprite from "../../icons.svg";
import api from "../../../api/api";
import { sendLeadToMeta } from "../../../utils/sendLeadToMeta"; // ✅ Импорт функции Meta Pixel

export default function PartnersForm({ isOpen, onClose }) {
  const initialState = {
    companyName: "",
    contactPerson: "",
    contactInfo: "",
    telegramNick: "",
    instagramLink: "",
  };

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleClose = () => {
    setFormData(initialState);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      console.log(formData);
      const dataToSend = {
        ...formData,
        utmMarks: utmParams,
      };
      api.createPartnerApplication(dataToSend);
      // ✅ Отправка события Lead в Meta Conversions API
      sendLeadToMeta({
        formType: "partner",
        phone: formData.contactInfo,
        name: formData.contactPerson,
        telegram: formData.telegramNick,
      });
    } catch (error) {
      console.log(error);
    }

    console.log("Отправлено:", formData);
    handleClose();
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
      <svg
        className={styles.closeModalPartnersForm}
        onClick={handleClose}
        width={14}
        height={14}
      >
        <use xlinkHref={`${sprite}#icon-close`}></use>
      </svg>

      <h2 className={styles.titlePartnersForm}>стати партнером</h2>

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
