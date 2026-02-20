const nodemailer = require("nodemailer");

// Send email verification link using Gmail
const sendEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  const appUrl = process.env.APP_URL || "http://localhost:5000";
  const url = `${appUrl}/api/verify/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `<h3>Click to verify:</h3><a href="${url}">Verify Email</a>`
  });
};

module.exports = sendEmail;
