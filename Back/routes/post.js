const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

// IMPORTATION CONTROLLERS
const postCtrl = require("../controllers/post");
// FIN IMPORTATION

// ROUTES - Création des différentes ROUTES de l'API en leurs précisant, dans l'ordre, leurs middlewares et controllers
router.get("/", postCtrl.getAllPosts);
router.get("/:id", postCtrl.getOnePost);
router.post("/", postCtrl.createPost);
router.delete("/:id", postCtrl.deletePost);
// router.delete("/", postCtrl.deletePost);
// FIN ROUTES

module.exports = router;
