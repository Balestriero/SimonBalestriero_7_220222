const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');

// IMPORTATION CONTROLLERS
const postCtrl = require("../controllers/post");
// FIN IMPORTATION

// ROUTES - Création des différentes ROUTES de l'API en leurs précisant, dans l'ordre, leurs middlewares et controllers
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, postCtrl.createPost);
router.delete("/:id", auth, postCtrl.deletePost);
// FIN ROUTES

module.exports = router;