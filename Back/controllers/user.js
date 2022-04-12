const sqlite = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// open the database
let db = new sqlite.Database(
  "../DB/db.sqlite",
  sqlite.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database.");
  }
);

// MIDDLEWARE SIGNUP  - Inscription de l'utilisateur et hashage du mot de passe
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = hash;

    

    db.run(
      `INSERT INTO users(username, password, email) VALUES(?, ?, ?)`,
      [username, password, email],
      function (err) {
        if (err) {
          return console.log(err.message);
        }
        res.status(201).json({ message: "Utilisateur créé !" });
      }
    );
  });
};
// FIN MIDDLEWARE

// MIDDLEWARE LOGIN avec vérification de l'email unique
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  //recherche de l'utilisateur dans la base de données
  db.get(
    `SELECT username, password FROM users WHERE email = ?`,
    [email],
    function (err, result) {
      if (err) {
        return res.status(500).json(err.message);
      }
      if (result == null) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      //si l'utilisateur existe, vérification du mot de passe
      bcrypt
        .compare(password, result.password)
        .then((valid) => {
          //si le mot de passe est incorrect
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            token: jwt.sign({ username: result.username }, "motdepasse", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((e) => {
          console.log(e);
          res.status(500).json(e);
        });
    }
  );
};
// FIN MIDDLEWARE
