const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');

// IMPORTATION CONTROLLERS
const postCtrl = require("../controllers/comment");
// FIN IMPORTATION

// ROUTES - Création des différentes ROUTES de l'API en leurs précisant, dans l'ordre, leurs middlewares et controllers
router.post("/", auth, postCtrl.createComment);
router.delete("/:id", auth, postCtrl.deleteComment);
// FIN ROUTES

module.exports = router;