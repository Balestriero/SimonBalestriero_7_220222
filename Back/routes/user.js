const express = require("express");
const router = express.Router();

// IMPORTATION USER CONTROLLERS - Importe le controller
const userCtrl = require("../controllers/user");
// FIN IMPORTATION

// ROUTES
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
// FIN ROUTES

module.exports = router;
