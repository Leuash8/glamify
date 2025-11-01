export const CONFIG = {
  whatsapp: "2349076879255",
  snapchat: "https://snapchat.com/t/pht2ka57",
  adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL ||"obunikeeffie@gmail.com",
  facebook: "https://facebook.com/glamify",

  pickupFee: 0, // Free pickup
  bankDetails: {
    bankName: "Moniepoint MFB",
    accountName: "IFUNANYACHUKWU OBUNIKE",
    accountNumber: "9076879255",
  },
  smtp: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number.parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER || "nagystephen71@gmail.com",
      pass: process.env.SMTP_PASSWORD || "vael ihug yttg sibs",
    },
  },
}
