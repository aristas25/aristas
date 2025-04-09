"use strict";

const express = require("express");
const router = express.Router();
const MainController = require("../controllers/MainController");

// USER
router.get("/main", (req, res, next) => MainController.getMain(req, res, next));

router.get("/more", (req, res, next) => MainController.getMore(req, res, next));

module.exports = router;
