"use strict";

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController.js");
const UtilsController = require("../controllers/UtilsController.js");
const ProfessionalController = require("../controllers/ProfessionalController.js");
const MercadopagoController = require("../controllers/MercadopagoController.js");

router.post("/mercadopago/token", async (req, res, next) => {
  MercadopagoController.getMercadoPagoToken(req, res, next);
});

// USERS
router.get("/users", (req, res, next) =>
  UserController.getUsers(req, res, next)
);

router.post("/users/login", (req, res, next) =>
  UserController.login(req, res, next)
);

router.get("/users/:user_id", (req, res, next) =>
  UserController.getUserById(req, res, next)
);

router.get("/users/medical-history/:user_id", (req, res, next) =>
  UserController.medicalHistory(req, res, next)
);

router.get("/users/username/:username", (req, res, next) =>
  UserController.getUserByUsername(req, res, next)
);

router.get("/users/email/:email", (req, res, next) =>
  UserController.getUserByEmail(req, res, next)
);

router.post("/users", (req, res, next) =>
  UserController.createUser(req, res, next)
);

router.post("/users/register", (req, res, next) =>
  UserController.createUser(req, res, next)
);

router.post("/users/forgot-password", (req, res, next) =>
  UserController.recoverPassword(req, res, next)
);

router.patch("/users/:user_id", (req, res, next) =>
  UserController.getUserByIdAndUpdate(req, res, next)
);

router.delete("/users/:user_id", (req, res, next) =>
  UserController.deleteUserById(req, res, next)
);

// PROESSIONALS
router.get("/professionals", (req, res, next) =>
  ProfessionalController.getProfessionals(req, res, next)
);

router.get("/professionals/search", (req, res, next) =>
  ProfessionalController.getProfessionalsByName(req, res, next)
);

// APPOINTMENTS
router.get("/appointments/available-slots", (req, res, next) =>
  ProfessionalController.getAvailableSlots(req, res, next)
);

router.post("/appointments", (req, res, next) =>
  ProfessionalController.createAppointment(req, res, next)
);

router.get("/appointments/user/:user_id", (req, res, next) =>
  ProfessionalController.getAppointmentsByuserId(req, res, next)
);

router.get("/appointments/professional/:user_id", (req, res, next) =>
  ProfessionalController.getAppointmentsByProfessionalId(req, res, next)
);

// UTILS
router.post("/utils/send-whatsapp", (req, res, next) =>
  UtilsController.sendWhatsApp(req, res, next)
);

router.post("/utils/email", (req, res, next) =>
  UtilsController.createConfirmAccountTemplate(req, res, next)
);

module.exports = router;
