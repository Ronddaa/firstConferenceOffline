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

  const qrBuffer = await QRCode.toBuffer(
    `https://admin.women.place/check/${invoice._id}`,
    {
      color: {
        dark: ticketName === "luxeTicket" ? "#ffffff" : "#000000",
        light: getCorrectQrCodeBackgroundColor(),
      },
    }
  );

  console.log(`${ticketName} was sent to ${invoice.user.email}`);
  const ticketHtml = await renderTemplate(ticketName, {});

  const thxForPaymentHtml = await renderTemplate("thxForPayment", {});

  try {
    await sendEmail({
      to: invoice.user.email,
      subject: "А ось і твій квиток, як і обіцяли)",
      html: ticketHtml,
      attachments: [
        {
          filename: "qrcode.png",
          content: qrBuffer,
          cid: "qrCode",
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }

  return { status: "success", email: invoice.user.email };
}
