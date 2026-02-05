import nodemailer from "nodemailer";
import env from "../config/env.config.js";
import logger from "../config/logger.config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.senderEmail,
    pass: env.googleAppPassword,
  },
});

async function sendMail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: env.senderEmail,
      to,
      subject,
      html,
    });
    logger.info("Message sent: %s", info.messageId);
  } catch (err) {
    logger.error(`Error: sending email! ${err}`);
  }
}

export default sendMail;
