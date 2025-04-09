"use strict";

const self = {};

const _ = require("lodash");

self.getMain = async (req, res) => {
  try {
    res.json({ status: "ok" });
  } catch (e) {
    res.json({ error: e.message });
  }
};

module.exports = self;
