import { useState } from "react";
import api from "../../api/api";

export default function CheckPaymentPage() {
  const [loading, setLoading] = useState(false);

  const handleTestPayment = async () => {
    setLoading(true);
    try {
      const response = await api.createPayment({
        user: {
          fullName: "Test User",
          phoneNumber: "+48111222333",
          email: "test@example.com",
          telegramNick: "@testuser",
        },
        purchase: {
          tariffs: ["TEST"],
          ticketsQuantity: 1,
          totalAmount: 1, // PLN
        },
        utmMarks: {
          utm_source: "test",
          utm_medium: "test",
          utm_campaign: "check_payment",
        },
      });

      if (response.pageUrl) {
        window.location.href = response.pageUrl;
      } else {
        alert("Не вдалося отримати посилання на оплату.");
      }
    } catch (err) {
      console.error("Помилка під час створення платежу:", err);
      alert("Щось пішло не так");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button
        onClick={handleTestPayment}
        disabled={loading}
        style={{
          padding: "12px 24px",
          fontSize: "18px",
          backgroundColor: loading ? "gray" : "#1d72b8",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Очікуйте..." : "Оплатити (тест)"}
      </button>
    </div>
  );
}
