import { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "./TicketsForm.module.css";
import sprite from "../../icons.svg";
import api from "../../../api/api";
import { sendLeadToMeta } from "../../../utils/sendLeadToMeta";

export default function TicketsForm({ isOpen, onClose }) {
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

  const tariffs = [
    { name: "LAST MINUTE", price: 770 },
    { name: "GOLD", price: 990 },
    { name: "PREMIUM", price: 1400 },
    { name: "LUXE", price: 5000 },
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
    if (!selected) return 0;

    let price = selected.price;
    const tariffName = selected.name.toLowerCase();

    const isDiscount =
      utmParams.utm_medium === "discount" &&
      ["luxe", "premium"].includes(tariffName);

    if (isDiscount) {
      price *= 0.9;
    }

    const isGoldAsLast =
      utmParams.utm_medium === "goldAsLast" && tariffName === "gold";

    if (isGoldAsLast) {
      const last = tariffs.find((t) => t.name.toLowerCase() === "last minute");
      if (last) price = last.price;
    }

    return Math.round(price * formData.quantity);
  };

  const handleClose = () => {
    setFormData(initialState);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    sendLeadToMeta({
      formType: "client",
      phone: formData.phone,
      name: formData.fullName,
      tariffName: formData.tariff,
      ticketQuantity: formData.quantity,
      purchaseValue: calculateTotal(),
      telegram: formData.telegramNick,
      ...utmParams,
    });

    try {
      const response = await api.createPayment({
        user: {
          fullName: formData.fullName,
          phoneNumber: formData.phone,
          email: formData.email.toLowerCase(),
          telegramNick: formData.telegramNick,
        },
        purchase: {
          tariffs: [formData.tariff],
          ticketsQuantity: formData.quantity,
          totalAmount: calculateTotal(),
        },
        utmMarks: utmParams,
      });

      if (response.pageUrl) {
        window.location.href = response.pageUrl;
      } else {
        console.error("Не удалось получить ссылку на оплату");
      }
    } catch (error) {
      console.error("Ошибка при создании платежа:", error);
      alert("Щось пішло не так. Спробуйте ще раз.");
    }
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

        {/* Тарифы */}
        <div className={styles.dropdownWrapper}>
          <button
            type="button"
            className={styles.dropdownToggle}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {formData.tariff || "Оберіть тариф"}{" "}
            <span>{dropdownOpen ? "▲" : "▼"}</span>
          </button>

          <ul
            className={`${styles.dropdownList} ${
              dropdownOpen ? styles.open : ""
            }`}
          >
            {tariffs.map((t) => {
              const name = t.name.toLowerCase();

              const isDiscount =
                utmParams.utm_medium === "discount" &&
                ["luxe", "premium"].includes(name);

              const isGoldAsLast =
                utmParams.utm_medium === "goldAsLast" && name === "gold";

              const discountedPrice = isDiscount
                ? Math.round(t.price * 0.9)
                : isGoldAsLast
                ? tariffs.find((x) => x.name.toLowerCase() === "last minute")
                    ?.price
                : t.price;

              return (
                <li
                  key={t.name}
                  className={styles.dropdownItem}
                  onClick={() => handleSelectTariff(t.name)}
                >
                  <span>
                    {t.name}
                    {(isDiscount || isGoldAsLast) && (
                      <span className={styles.discountLabel}>
                        {isDiscount ? " (−10%)" : " (спецціна)"}
                      </span>
                    )}
                  </span>

                  <span>
                    {isDiscount || isGoldAsLast ? (
                      <>
                        <span className={styles.oldPrice}>{t.price}PLN</span>{" "}
                        <span className={styles.newPrice}>
                          {discountedPrice}PLN
                        </span>
                      </>
                    ) : (
                      <span className={styles.newPrice}>{t.price} PLN</span>
                    )}
                  </span>
                </li>
              );
            })}
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
          сума до сплати: {calculateTotal()} PLN
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
