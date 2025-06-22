import nodemailer from "nodemailer";
import env from "./env.js";
import { SMTP } from "../constants/index.js";

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASS),
  },
});

// const optionsExample = {
//   to: "some user email",
//   subject: "Email Subject",
//   html: `templateData`,
// };

export const sendEmail = async (options) => {
  const mailOptions = {
    from: env("SMTP_FROM"),
    ...options,
  };

  return await transporter.sendMail(mailOptions);
};
