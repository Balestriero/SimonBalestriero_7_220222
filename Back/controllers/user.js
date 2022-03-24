// MIDDLEWARE SIGNUP  - Inscription de l'utilisateur et hashage du mot de passe
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const email = req.body.email;
      const username = req.body.username;
      const password = hash;

      let sqlSignup;
      let values;

      sqlSignup =
        "INSERT INTO user VALUES (NULL, ?, ?, ?, NULL, ?, NULL, avatarUrl, NOW())";
      values = [email, username, password];
      mysql.query(sqlSignup, values, function (err, result) {
        if (err) {
          return res.status(500).json(err.message);
        }
        res.status(201).json({ message: "Utilisateur créé !" });
      });
    })
    .catch((e) => res.status(500).json(e));
};
// FIN MIDDLEWARE

// MIDDLEWARE LOGIN avec vérification de l'email unique
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const sqlFindUser = "SELECT userID, password FROM User WHERE email = ?";
  //recherche de l'utilisateur dans la base de données
  mysql.query(sqlFindUser, [email], function (err, result) {
    if (err) {
      return res.status(500).json(err.message);
    }
    if (result.length == 0) {
      return res.status(401).json({ error: "Utilisateur non trouvé !" });
    }
    //si l'utilisateur existe, vérification du mot de passe
    bcrypt
      .compare(password, result[0].password)
      .then((valid) => {
        //si le mot de passe est incorrect
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
        res.status(200).json({
          token: jwt.sign({ userID: result[0].userID }, env.token, {
            expiresIn: "24h",
          }),
        });
      })
      .catch((e) => res.status(500).json(e));
  });
};
// FIN MIDDLEWARE
