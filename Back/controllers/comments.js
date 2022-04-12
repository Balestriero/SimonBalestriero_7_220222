const sqlite = require("sqlite3").verbose();

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

// MIDDLEWARE CREATECOMMENT pour céer les commentaires
exports.createComment = (req, res, next) => {
  const username = req.body.username;
  const content = req.body.content;
  const dateCreation = Date.now();
  const post = req.body.post;

  db.run(
    `INSERT INTO comments(date_publication, user_id, content) VALUES (?, ?, ?, ?)`,
    [dateCreation, username, content, post],
    // modifier ca ? "username" et "post" doivent être remplacés par le username loggé au moment du comment et le post sélectionné
    function (err, result) {
      if (err) {
        return res.status(500).json(err.message);
      }
      res.status(201).json({ message: "Comment crée !" });
    }
  );
};
// FIN MIDDLEWARE

// MIDDLEWARE DELETECOMMENT pour supprimer les commentaires
exports.deleteComment = (req, res, next) => {
  const commentID = req.params.id;
  const userID = req.userID;

  db.run(
    `DELETE FROM comments WHERE userID = ? AND commentID = ?`,
    [userID, commentID],
    function (err, result) {
      if (err) {
        return res.status(500).json(err.message);
      }
      res.status(200).json({ message: "Comment supprimé !" });
    }
  );
};

// FIN MIDDLEWARE