import puppeteer from "puppeteer";
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
        return "##1B2021";
      default:
        break;
    }
  };
  const qrDataUrl = await QRCode.toDataURL(
    `https://admin.women.place/check/${invoice._id}`,
    {
      color: {
        dark: ticketName === "luxeTicket" ? "#ffffff" : "#000000", // белые модули
        light: getCorrectQrCodeBackgroundColor(),
      },
    }
  );

  // 2. Подготовим данные для шаблона
  const data = {
    qrImage: qrDataUrl,
  };

  const template = await renderTemplate(ticketName, data);

  // 4. Запускаем puppeteer и генерируем PDF
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Устанавливаем контент
  await page.setContent(template, { waitUntil: "networkidle0" });
  await page.emulateMediaType("screen"); // чтобы printBackground заработал

  const pdfBuffer = await page.pdf({
    printBackground: true,
    width: "595px", // A4 width (примерно)
    height: await page.evaluate(() => {
      const body = document.body;
      return `${body.scrollHeight}px`;
    }),
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();

  const thxForPaymentHtml = renderTemplate("thxForPayment", {});
  // 5. Отправляем письмо с PDF во вложении
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
