"use strict";

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// USERS
router.get("/users", (req, res, next) =>
  UserController.getUsers(req, res, next)
);

router.post("/users/login", (req, res, next) =>
  UserController.login(req, res, next)
);

router.get("/users/:userId", (req, res, next) =>
  UserController.getUserById(req, res, next)
);
router.get("/users/:username", (req, res, next) =>
  UserController.getUserByUsername(req, res, next)
);

router.post("/users", (req, res, next) =>
  UserController.createUser(req, res, next)
);

router.patch("/users/:userId", (req, res, next) =>
  UserController.getUserByIdAndUpdate(req, res, next)
);

router.delete("/users/:userId", (req, res, next) =>
  UserController.deleteUserById(req, res, next)
);

module.exports = router;
