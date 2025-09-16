"use server";

import nodemailer from "nodemailer";

export const sendEmail = async (senderName: string, senderEmail: string, text: string) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: process.env.RECIPIENT_EMAIL,
    subject: `New Contact Form Submission from ${senderName} (${senderEmail})`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${senderName}</p>
      <p><strong>Email:</strong> ${senderEmail}</p>
      <p><strong>Message:</strong></p>
      <p>${text}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};