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
    takeBrunch: false, // Добавлено для бранча
  };

  const [formData, setFormData] = useState(initialState);
  const [promoInfo, setPromoInfo] = useState(null);
  const [promoError, setPromoError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [brunchSelected, setBrunchSelected] = useState(false);

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
    {name: "CONCERT", price: 500 }
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
    const checkPromoCode = async () => {
      if (!formData.promoCode) {
        setPromoInfo(null);
        setPromoError(null);
        return;
      }

      try {
        const res = await fetch(`/api/promo/${formData.promoCode}`);
        const data = await res.json();
        // console.log("Promo API response:", data); // Для отладки

        if (res.ok && data.valid) {
          setPromoInfo(data);
          setPromoError(null);
        } else {
          setPromoInfo(null);
          setPromoError("Промокод недійсний або вже використаний");
        }
      } catch (err) {
        console.error("Ошибка при проверке промокода на фронте:", err);
        setPromoInfo(null);
        setPromoError("Помилка при перевірці промокода");
      }
    };

    const delayDebounceFn = setTimeout(() => {
      checkPromoCode();
    }, 300); // Небольшая задержка для debounce

    return () => clearTimeout(delayDebounceFn);
  }, [formData.promoCode]);

  // Общий обработчик изменений в полях формы
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Обработчик изменения количества билетов
  const handleQuantityChange = (delta) => {
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + delta),
    }));
  };

  // Обработчик выбора тарифа из выпадающего списка
  const handleSelectTariff = (name) => {
    setFormData((prev) => ({ ...prev, tariff: name }));
    setDropdownOpen(false);
  };

  // Обработчик для чекбокса бранча
  // const toggleBrunch = () => {
  //   setBrunchSelected((prev) => !prev);
  //   setFormData((prev) => ({ ...prev, takeBrunch: !prev })); // Обновляем takeBrunch в formData
  // };

  // Логика расчета стоимости бранча (зависит от selectedTariff и quantity)
  const getBrunchPrice = () => {
    if (!formData.takeBrunch) return 0; // Используем formData.takeBrunch
    const tariff = formData.tariff.toLowerCase();
    let discount = 0;

    if (tariff === "premium") discount = 0.1;
    else if (tariff === "gold") discount = 0.15;
    else if (tariff === "luxe") discount = 0.2;

    const brunch = tariffs.find((t) => t.name === "BRUNCH");
    if (!brunch) return 0;

    const pricePerPerson = Math.round(brunch.price * (1 - discount));
    return pricePerPerson * formData.quantity;
  };

  // Логика расчета общей суммы (в PLN), включая тариф, количество, промокод и бранч
  const calculateTotal = () => {
    const selected = tariffs.find((t) => t.name === formData.tariff);
    if (!selected) return 0;

    const tariffName = selected.name.toLowerCase();

    // Промокод имеет приоритет
    if (
      promoInfo &&
      promoInfo.tariff?.toLowerCase() === tariffName && // Проверка на tariff? для безопасности
      !promoError
    ) {
      return promoInfo.fixedPrice * formData.quantity;
    }

    let price = selected.price;

    // Специальные условия для UTM-меток
    if (utmParams.utm_medium === "startubhub") {
      if (tariffName === "premium") price = 1720;
      if (tariffName === "luxe") price = 4700;
    }

    const isDiscount =
      utmParams.utm_medium === "discount" &&
      ["luxe", "premium"].includes(tariffName);

    if (isDiscount) price *= 0.9;

    const isGoldAsLast =
      utmParams.utm_medium === "goldAsLast" && tariffName === "gold";

    if (isGoldAsLast) {
      const last = tariffs.find((t) => t.name.toLowerCase() === "last minute");
      if (last) price = last.price;
    }

    // Отдельный тариф BRUNCH
    if (tariffName === "brunch") {
      return selected.price * formData.quantity;
    }

    return Math.round(price * formData.quantity + getBrunchPrice());
  };

  // Проверка валидности формы для активации кнопки "перейти до оплати"
  const isFormValid = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.telegramNick.trim() !== "" && // Теперь telegramNick обязателен на фронте
      formData.tariff.trim() !== "" &&
      formData.quantity > 0
    );
  };

  // Обработчик закрытия модального окна (сброс состояния формы)
  const handleClose = () => {
    setFormData(initialState);
    setPromoInfo(null);
    setPromoError(null);
    setDropdownOpen(false);
    setBrunchSelected(false);
    onClose();
  };

  // Обработчик отправки формы (создание платежа)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Будь ласка, заповніть усі обов'язкові поля.");
      return;
    }

    const cleanTelegramNick = formData.telegramNick.startsWith("@")
      ? formData.telegramNick.substring(1)
      : formData.telegramNick;

    // Отправка данных в Meta (Facebook Pixel / Conversions API)
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
      // Отправка данных на ваш бэкенд для создания платежа
      const response = await api.createPayment({
        user: {
          fullName: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
          phoneNumber: formData.phone,
          email: formData.email.toLowerCase(),
          telegram: {
            // Отправляем только те поля, которые у нас есть или которые нужны для схемы
            id: "", // Отправляем пустую строку, если нет Telegram ID
            userName: cleanTelegramNick || "", // Отправляем значение или пустую строку
            firstName: "", // Отправляем пустую строку
            languageCode: "", // Отправляем пустую строку
            phone: "", // Отправляем пустую строку
            isPremium: false, // Отправляем false
            source: [], // Отправляем пустой массив
            transitions: [], // Отправляем пустой массив
          },
        },
        conferences: [
          {
            conference: "warsawkod", // Название конференции
            type: "offline", // Тип конференции (онлайн/оффлайн)
            ticketType: formData.tariff, // Выбранный тариф
            ticketsQuantity: formData.quantity, // Количество билетов
            totalAmount: calculateTotal(), // Общая сумма (рассчитывается на фронтенде)
            takeBrunch: formData.takeBrunch, // Выбрана ли опция бранча
            paymentData: {
              invoiceId: "", // Будет заполнено после создания платежа на бэкенде
              status: "pending", // Начальный статус платежа
            },
            promoCode: formData.promoCode || "", // Промокод (пустая строка, если не заполнен)
            utmMarks: [
              // UTM-метки (массив объектов)
              {
                source: utmParams.utm_source || "",
                medium: utmParams.utm_medium || "",
                campaign: utmParams.utm_campaign || "",
              },
            ],
          },
        ],
      });

      // Перенаправление на страницу оплаты Monobank
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
      ariaHideApp={false} // Отключает предупреждение, если не используется React App
    >
      <svg
        className={styles.closeModalTicketsForm}
        onClick={handleClose}
        width={14}
        height={14}
      >
        <use xlinkHref={`${sprite}#icon-close`} />{" "}
      </svg>

      <h2 className={styles.titleTicketsForm}>придбати квиток</h2>

      <form className={styles.TicketsForm} onSubmit={handleSubmit}>
        {/* Поля ввода для имени, фамилии, email, телефона, Telegram ника и промокода */}
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
          required // Сделали обязательным на фронте
        />
        <input
          id="promoCode"
          type="text"
          className={styles.inputTicketsForm}
          placeholder="Promo Code"
          value={formData.promoCode}
          onChange={handleChange}
        />

        <p className={styles.biteForWriteTg}>
          *заповнивши ці поля у вас є можливість отримати подарунок від нас!
        </p>

        {/* Выпадающий список для выбора тарифа и чекбокс бранча */}
        <div className={styles.dropdownWrapper}>
          <button
            type="button"
            className={styles.dropdownToggle}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {formData.tariff || "Оберіть тариф"}{" "}
            <span>{dropdownOpen ? "▲" : "▼"}</span>
          </button>

          {/* <label className={styles.brunchCheckbox}>
            <input
              type="checkbox"
              checked={brunchSelected}
              onChange={toggleBrunch}
            />
            Бранч MGVC від Марисі Горобець 24.08.25
          </label> */}

          <ul
            className={`${styles.dropdownList} ${
              dropdownOpen ? styles.open : ""
            }`}
          >
            {tariffs.map((t) => {
              // Исключаем "BRUNCH" из основного списка тарифов, если он отдельный
              if (t.name === "BRUNCH") return null;

              const name = t.name.toLowerCase();

              let displayPrice = t.price;
              let label = "";

              if (utmParams.utm_medium === "startubhub") {
                if (name === "premium") {
                  displayPrice = 1720;
                  label = "спецціна";
                }
                if (name === "luxe") {
                  displayPrice = 4700;
                  label = "спецціна";
                }
              }

              const isDiscount =
                utmParams.utm_medium === "discount" &&
                ["luxe", "premium"].includes(name);

              const isGoldAsLast =
                utmParams.utm_medium === "goldAsLast" && name === "gold";

              if (isDiscount) {
                displayPrice = Math.round(t.price * 0.9);
                label = "−10%";
              }

              if (isGoldAsLast) {
                displayPrice = tariffs.find(
                  (x) => x.name.toLowerCase() === "last minute"
                )?.price;
                label = "спецціна";
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
                    {displayPrice !== t.price ? (
                      <>
                        <span className={styles.oldPrice}>{t.price}PLN</span>{" "}
                        <span className={styles.newPrice}>
                          {displayPrice}PLN
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

        {/* Счетчик количества билетов */}
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

        {/* Общая сумма к оплате */}
        <p className={styles.SumForTickets}>
          сума до сплати: {calculateTotal()} PLN
        </p>

        {/* Кнопка отправки формы */}
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
