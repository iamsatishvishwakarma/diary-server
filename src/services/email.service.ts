import nodemailer, { Transporter } from "nodemailer";
import config from "../configs/app.config";
import logger from "../utils/logger";

let transporter: Transporter;

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.EMAIL,
        pass: config.GOOGLE_EMAIL_APP_PASSWORD,
      },
    });
  }
  return transporter;
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  try {
    await getTransporter().sendMail({
      from: config.EMAIL,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    logger.error("EMAIL_SEND_ERROR", { error });
    return false;
  }
}
