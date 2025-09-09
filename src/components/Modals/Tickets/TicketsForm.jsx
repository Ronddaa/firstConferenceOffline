import { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "./TicketsForm.module.css";
import sprite from "../../icons.svg";
import api from "../../../api/api";
import { sendLeadToMeta } from "../../../utils/sendLeadToMeta";

export default function TicketsForm({ isOpen, onClose }) {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    telegramNick: "",
    tariff: "",
    quantity: 1,
    promoCode: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [promoError, setPromoError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [utmParams, setUtmParams] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
  });

  const tariffs = [
    { name: "LAST MINUTE", price: 650 },
    { name: "GOLD", price: 990 },
    { name: "PREMIUM", price: 1900 },
    { name: "LUXE", price: 5000 },
    { name: "BRUNCH", price: 1100 },
    { name: "CONCERT", price: 500 },
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
    });
  }, []);

  useEffect(() => {
    const checkPromoCode = () => {
      const code = formData.promoCode.toUpperCase().trim();
      if (!code) {
        setPromoError(null);
        return;
      }

      if (
        code === "WOMENKOD2025" ||
        code === "AGIBALOVA10" ||
        code === "ARINA10" ||
        code === "WOMAN10"
      ) {
        setPromoError(null);
      } else {
        setPromoError("Промокод недійсний");
      }
    };

    const delayDebounceFn = setTimeout(() => {
      checkPromoCode();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [formData.promoCode]);

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
    const promoCode = formData.promoCode.toUpperCase().trim();

    if (promoCode === "WOMENKOD2025") {
      price = Math.max(0, price - 20);
    } else if (promoCode === "AGIBALOVA10" || promoCode === "WOMAN10") {
      price = Math.max(0, price - 10);
    } else if (promoCode === "ARINA10") {
      price = Math.round(price * 0.9);
    }

    return Math.round(price * formData.quantity);
  };

  const getPromoMessage = () => {
    const code = formData.promoCode.toUpperCase().trim();
    if (!code || promoError) return null;

    if (code === "WOMENKOD2025")
      return "Промокод WOMENKOD2025 застосовано (-20€)";
    if (code === "AGIBALOVA10")
      return "Промокод AGIBALOVA10 застосовано (-10€)";
    if (code === "ARINA10") return "Промокод ARINA10 застосовано (-10%)";
    if (code === "WOMAN10") return "Промокод WOMAN10 застосовано (-10€)";

    return null;
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.telegramNick.trim() !== "" &&
      formData.tariff.trim() !== "" &&
      formData.quantity > 0
    );
  };

  const handleClose = () => {
    setFormData(initialState);
    setPromoError(null);
    setDropdownOpen(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Будь ласка, заповніть усі обов'язкові поля.");
      return;
    }

    const cleanTelegramNick = formData.telegramNick.startsWith("@")
      ? formData.telegramNick.substring(1)
      : formData.telegramNick;

    sendLeadToMeta({
      formType: "client",
      phone: formData.phone,
      fullName: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      tariffName: formData.tariff,
      ticketQuantity: formData.quantity,
      purchaseValue: calculateTotal(),
      telegram: formData.telegramNick,
      ...utmParams,
    });

    try {
      const response = await api.createPayment({
        user: {
          fullName: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
          phoneNumber: formData.phone,
          email: formData.email.toLowerCase(),
          telegram: {
            id: "",
            userName: cleanTelegramNick || "",
            firstName: "",
            languageCode: "",
            isPremium: false,
            source: [],
            transitions: [],
          },
        },
        conferences: [
          {
            conference: "warsawkod",
            type: "offline",
            ticketType: formData.tariff,
            ticketsQuantity: formData.quantity,
            totalAmount: calculateTotal(),
            promoCode: formData.promoCode || "",
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

      if (response.pageUrl) {
        window.location.href = response.pageUrl;
      } else {
        console.error("Не вдалося отримати посилання на оплату від Monobank.");
        alert("Виникла помилка. Будь ласка, спробуйте ще раз.");
      }
    } catch (error) {
      console.error("Помилка при створенні платежу:", error);
      alert(
        "Виникла помилка при створенні платежу. Будь ласка, спробуйте ще раз."
      );
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
          id="firstName"
          type="text"
          className={styles.inputTicketsForm}
          placeholder="Ім’я"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          id="lastName"
          type="text"
          className={styles.inputTicketsForm}
          placeholder="Прізвище"
          value={formData.lastName}
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
        <input
          id="promoCode"
          type="text"
          className={styles.inputTicketsForm}
          placeholder="Promo Code"
          value={formData.promoCode}
          onChange={handleChange}
        />

        {promoError && <p className={styles.promoErrorText}>{promoError}</p>}
        {getPromoMessage() && (
          <p className={styles.promoSuccessText}>{getPromoMessage()}</p>
        )}

        <p className={styles.biteForWriteTg}>
          *заповнивши ці поля у вас є можливість отримати подарунок від нас!
        </p>

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
            {tariffs.map((t) => {
              if (t.name === "BRUNCH") return null;

              let displayPrice = t.price;
              let label = "";
              const promoCode = formData.promoCode.toUpperCase().trim();
              let hasPromo = false;

              if (promoCode === "WOMENKOD2025") {
                displayPrice = Math.max(0, t.price - 20);
                label = "-20€";
                hasPromo = true;
              } else if (
                promoCode === "AGIBALOVA10" ||
                promoCode === "WOMAN10"
              ) {
                displayPrice = Math.max(0, t.price - 10);
                label = "-10€";
                hasPromo = true;
              } else if (promoCode === "ARINA10") {
                displayPrice = Math.round(t.price * 0.9);
                label = "-10%";
                hasPromo = true;
              }

              return (
                <li
                  key={t.name}
                  className={styles.dropdownItem}
                  onClick={() => handleSelectTariff(t.name)}
                >
                  <span>
                    {t.name}
                    {label && (
                      <span className={styles.discountLabel}> ({label})</span>
                    )}
                  </span>
                  <span>
                    {hasPromo ? (
                      <>
                        <span className={styles.oldPrice}>{t.price} PLN</span>{" "}
                        <span className={styles.newPrice}>
                          {displayPrice} PLN
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
            isFormValid()
              ? styles.sendBtnTicketsForm
              : `${styles.sendBtnTicketsForm} ${styles.sendBtnTicketsFormNoValid}`
          }
          type="submit"
          disabled={!isFormValid()}
        >
          перейти до оплати
        </button>
      </form>
    </Modal>
  );
}
