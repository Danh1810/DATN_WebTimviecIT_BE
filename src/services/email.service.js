import nodemailer from "nodemailer";
import env from "dotenv";
env.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "danhnguyen.18102002@gmail.com", // Replace with your email
    pass: "edye zspm rrxv oqqv", // Replace with your email password
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.email, // Replace with your email
    to,
    subject,
    text,
  };
  console.log(mailOptions);
  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
