const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

// IMPORTATION CONTROLLERS
const commentCtrl = require("../controllers/comments");

// ROUTES
router.get("/", commentCtrl.getAllComments);
router.post("/", commentCtrl.createComment);
// router.delete("/:id", commentCtrl.deleteComment);
router.delete("/", commentCtrl.deleteComment);

module.exports = router;
