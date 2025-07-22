import nodemailer from "nodemailer";

import dotenv from 'dotenv';

dotenv.config();

  console.log('EMAIL_USER:', process.env.SMTP_USER);
    console.log('EMAIL_PASS:', process.env.SMTP_PASS);
    console.log('EMAIL_PASS:', process.env.SENDER_EMAIL);

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
});

export default transporter;