const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// IMPORTATION ROUTES
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
// FIN IMPORTATIONS

app.use(bodyParser.json());

app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
