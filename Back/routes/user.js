const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

// IMPORTATION USER CONTROLLERS - Importe le controller
const userCtrl = require("../controllers/user");
// FIN IMPORTATION

// ROUTES
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
// router.delete("/login:id", userCtrl.deleteUser);
router.delete("/login", userCtrl.deleteUser);

// FIN ROUTES

module.exports = router;
