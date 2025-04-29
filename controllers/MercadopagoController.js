"use strict";

const self = {};

const _ = require("lodash");
const config = require("../config");

self.getMercadoPagoToken = async (req, res) => {
  const { code } = req.body;

  try {
    const response = await fetch("https://api.mercadopago.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: config.mercadopago.clientId,
        client_secret: config.mercadopago.secretKey,
        code,
        redirect_uri: config.mercadopago.redirectUrl,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = self;
