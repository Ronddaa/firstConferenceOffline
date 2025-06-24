import { useState } from "react";
import Modal from "react-modal";
import styles from "./TicketsForm.module.css";
import sprite from "../../icons.svg";
import api from "../../../api/api";

export default function TicketsForm({ isOpen, onClose }) {
  const tariffs = [
    { name: "GOLD", price: 300 },
    { name: "PREMIUM", price: 450 },
    { name: "Luxe", price: 1200 },
    // { name: "Only ticket", price: 150 },
  ];

  const initialState = {
    fullName: "",
    email: "",
    phone: "",
    telegramNick: "",
    tariff: "",
    quantity: 1,
  };

  const [formData, setFormData] = useState(initialState);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isFormValid = Object.entries(formData).every(([key, value]) => {
    if (key === "quantity") return value > 0;
    return value.toString().trim() !== "";
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleQuantityChange = (delta) => {
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + delta),
    }));
  };

  const handleSelectTariff = (name) => {
    setFormData((prev) => ({ ...prev, tariff: name }));
    setDropdownOpen(false);
  };

  const calculateTotal = () => {
    const selected = tariffs.find((t) => t.name === formData.tariff);
    return selected ? selected.price * formData.quantity : 0;
  };

  const handleClose = () => {
    setFormData(initialState);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    console.log("Данные формы:", formData);

    const response = await api.createPayment({
      amount: calculateTotal(),
      currency: 840,
      redirectUrl: "https://warsawkod.women.place",
      user: {
        fullName: formData.fullName,
        phoneNumber: formData.phone,
        email: formData.email.toLocaleLowerCase(),
        telegramNick: formData.telegramNick,
      },
      purchase: {
        tariffs: [formData.tariff],
        ticketsQuantity: formData.quantity,
        totalAmount: calculateTotal(),
      },
    });

    window.location.href = response.pageUrl;

    // handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={styles.modalTicketsForm}
      className={styles.modalTicketsFormContent}
      closeTimeoutMS={400}
      onRequestClose={handleClose}
      ariaHideApp={false}
    >
      <svg
        className={styles.closeModalTicketsForm}
        onClick={handleClose}
        width={14}
        height={14}
      >
        <use xlinkHref={`${sprite}#icon-close`} />
      </svg>

      <h2 className={styles.titleTicketsForm}>придбати квиток</h2>

      <form className={styles.TicketsForm} onSubmit={handleSubmit}>
        <input
          id="fullName"
          type="text"
          className={styles.inputTicketsForm}
          placeholder="Ім’я, прізвище"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          id="email"
          type="email"
          className={styles.inputTicketsForm}
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          id="phone"
          type="tel"
          className={styles.inputTicketsForm}
          placeholder="Телефон*"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          id="telegramNick"
          type="text"
          className={styles.inputTicketsForm}
          placeholder="Нік Telegram*"
          value={formData.telegramNick}
          onChange={handleChange}
          required
        />

        <p className={styles.biteForWriteTg}>
          *заповнивши це поле у вас є можливість отримати подарунок від нас!
        </p>

        {/* Кастомный селект с тарифами */}
        <div className={styles.dropdownWrapper}>
          <button
            type="button"
            className={styles.dropdownToggle}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {formData.tariff || "Оберіть тариф"}
            <span>{dropdownOpen ? "▲" : "▼"}</span>
          </button>

          <ul
            className={`${styles.dropdownList} ${
              dropdownOpen ? styles.open : ""
            }`}
          >
            {tariffs.map((t) => (
              <li
                key={t.name}
                className={styles.dropdownItem}
                onClick={() => handleSelectTariff(t.name)}
              >
                <span>{t.name}</span>
                <span>{t.price}$</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Кол-во билетов */}
        <div className={styles.ticketCounter}>
          <span>Кількість квитків:</span>
          <div className={styles.counterControls}>
            <button
              className={styles.plusminusBtn}
              type="button"
              onClick={() => handleQuantityChange(-1)}
              disabled={formData.quantity <= 1}
            >
              –
            </button>
            <span>{formData.quantity}</span>
            <button
              className={styles.plusminusBtn}
              type="button"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>
        </div>

        <p className={styles.SumForTickets}>
          сума до сплати: {calculateTotal()} $
        </p>

        <button
          className={
            isFormValid
              ? styles.sendBtnTicketsForm
              : `${styles.sendBtnTicketsForm} ${styles.sendBtnTicketsFormNoValid}`
          }
          type="submit"
          disabled={!isFormValid}
        >
          перейти до оплати
        </button>
      </form>
    </Modal>
  );
}
