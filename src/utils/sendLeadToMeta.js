// 📁 src/utils/sendLeadToMeta.js

/**
 * Извлекает UTM-метки из текущего URL
 * @returns {Object} utm-параметры
 */
function getUtmParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || ""
    };
  }
  
  /**
   * Отправляет событие Lead в Meta Conversions API
   * @param {Object} payload - Данные формы
   * @param {string} payload.formType - Тип формы (client | speaker | partner)
   * @param {string} payload.phone - Телефон пользователя
   * @param {string} payload.name - Полное имя пользователя
   * @param {string} [payload.tariffName] - Название тарифа (только для client)
   * @param {number} [payload.ticketQuantity] - Количество билетов (только для client)
   * @param {number} [payload.purchaseValue] - Общая сумма покупки (только для client)
   * @param {string} [payload.telegram] - Телеграм пользователя
   */
  export async function sendLeadToMeta({
    formType,
    phone,
    name,
    tariffName,
    ticketQuantity,
    purchaseValue,
    telegram
  }) {
    const utm = getUtmParams();
  
    try {
      const response = await fetch("https://graph.facebook.com/v19.0/817564253336054/events?access_token=EAA6QZBm8QxfgBO6Iy5ZA9Tzu6lZAJ8MwfmReKgfeqnTiZCDTqPkwEq1kSRK7qvbyQW6Eu5HHWjBLYsjFGrJDhv6B9g24WdKAqrogh8sTD7Ptsxxm08cmZB6onwVEuWI013oltsZCBiEqrIXoeYBJ3TozwNdrA8vBg2jJJm0fU9ZBVlfDvl5Cef1D4VBvIFTCGriIQZDZD", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: window.location.href,
          user_data: {
            // очищаем телефон от символов, оставляем только цифры
            ph: phone.replace(/\D/g, ""),
            // берём имя и приводим к нижнему регистру
            fn: name.trim().split(" ")[0]?.toLowerCase()
          },
          custom_data: {
            form_type: formType,
            tariff_name: tariffName,
            ticket_quantity: ticketQuantity,
            purchase_value: purchaseValue,
            telegram: telegram,
            ...utm // добавляем UTM-метки
          }
        })
      });
  
      const result = await response.json();
      console.log("✅ Meta CAPI result:", result);
    } catch (error) {
      console.error("❌ Error sending to Meta CAPI:", error);
    }
  }
  