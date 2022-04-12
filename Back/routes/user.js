const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');


// IMPORTATION USER CONTROLLERS - Importe le controller
const userCtrl = require("../controllers/user");
// FIN IMPORTATION

// ROUTES
router.post("/signup", auth, userCtrl.signup);
router.post("/login", auth, userCtrl.login);
// FIN ROUTES

module.exports = router;
