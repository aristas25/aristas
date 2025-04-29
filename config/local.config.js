const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const config = {
  brand: "Aristas",
  baseUrl,
  link_confirm_account: "https://aristas.com/confirm-account",
  twilio: {
    account_sid: process.env.TWILIO_ACCOUNT_SID,
    auth_token: process.env.TWILIO_AUTH_TOKEN,
    whatsapp_number: process.env.TWILIO_WHATSAPP_NUMBER,
    templates: {
      confirmed_appointment: "HX52efa2800fffecb42583facd92a4955a",
    },
  },
  sendgrid: {
    email: "apparistas@gmail.com",
    api_key: process.env.SENDGRID_API_KEY,
  },
  mercadopago: {
    clientId: process.env.MERCADOPAGO_CLIENT_ID,
    secretKey: process.env.MERCADOPAGO_SECRET_KEY,
    redirectUrl: baseUrl + "/mercadopago/callback",
  },
};

module.exports = config;
