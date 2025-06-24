import pdf from "html-pdf";
import QRCode from "qrcode";

import { sendEmail } from "./sendEmail.js";
import { renderTemplate } from "./renderTemplate.js";

export async function sendTicket(invoice, ticketName) {
  // 1. Генерируем QR-код в base64
  const getCorrectQrCodeBackgroundColor = () => {
    switch (ticketName) {
      case "goldTicket":
        return "#FFFFAC";
      case "premiumTicket":
        return "#9EB7E5";
      case "luxeTicket":
        return "#1B2021"; // исправил двойной ##
      default:
        return "#ffffff"; // дефолтный цвет фона
    }
  };

  const qrDataUrl = await QRCode.toDataURL(
    `https://admin.women.place/check/${invoice._id}`,
    {
      color: {
        dark: ticketName === "luxeTicket" ? "#ffffff" : "#000000",
        light: getCorrectQrCodeBackgroundColor(),
      },
    }
  );

  // 2. Подготовим данные для шаблона
  const data = {
    qrImage: qrDataUrl,
  };

  const template = await renderTemplate(ticketName, data);

  // 3. Генерируем PDF из HTML с помощью html-pdf
  const pdfOptions = {
    // Устанавливаем ширину PDF равной ширине вашего контента в HTML
    width: "595px",
    // Устанавливаем высоту PDF, чтобы вместить весь контент.
    // Используйте 1490px, если это желаемая и достаточная высота для вашего билета.
    height: "1490px",
    border: "0",
    margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
    // clip тоже должен соответствовать этим размерам для обрезки
    clip: {
      x: 0,
      y: 0,
      width: 595,
      height: 1490,
    },
    printBackground: true,
  };

  const pdfBuffer = await new Promise((resolve, reject) => {
    pdf.create(template, pdfOptions).toBuffer((err, buffer) => {
      if (err) return reject(err);
      resolve(buffer);
    });
  });

  // 4. Формируем письмо
  const thxForPaymentHtml = await renderTemplate("thxForPayment", {});

  // 5. Отправляем письмо с PDF вложением
  await sendEmail({
    to: invoice.user.email,
    subject: "Дякуємо за покупку. Лови свій квиток!",
    html: thxForPaymentHtml,
    attachments: [
      {
        filename: "ticket.pdf",
        content: pdfBuffer,
      },
    ],
  });

  return { status: "success", email: invoice.user.email };
}
