const express = require("express");
const app = express();

// IMPORTATION ROUTES
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
// FIN IMPORTATIONS

app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});

module.exports = app;
