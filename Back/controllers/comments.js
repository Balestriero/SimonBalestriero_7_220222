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
    `INSERT INTO comments(date_publication, user_id, content, post_id) VALUES (?, ?, ?, ?)`,
    [dateCreation, username, content, post],
    // modifier ca ? "username" et "post" doivent être remplacés par le username loggé au moment du comment et le post sélectionné
    function (err, result) {
      if (err) {
        return res.status(500).json(err.message);
      }
      res.status(201).json({ message: "Commentaire crée !" });
    }
  );
};
// FIN MIDDLEWARE

// MIDDLEWARE DELETECOMMENT pour supprimer les commentaires
exports.deleteComment = (req, res, next) => {
  const userID = req.body.userID;
  const commentID = req.body.commentID;
  
  db.run(
    `DELETE FROM comments WHERE user_Id = ? AND commentID = ?`,
    [userID, commentID],
    function (err, result) {
      if (err) {
        return res.status(500).json(err.message);
      }
      res.status(200).json({ message: "Commentaire supprimé !" });
    }
  );
};

// FIN MIDDLEWARE

// getAllComFromSingleMessage pour récupérer tous les commentaires d'un message
exports.getAllPosts = (req, res, next) => {
  db.all(
    `SELECT * FROM posts ORDER BY date_publication`,
    [],
    function (err, result) {
      if (err) {
        return res.status(500).json(err.message);
      }
      if (result == null) {
        return res.status(400).json({ message: "Aucun post à afficher !" });
      }
      res.status(200).json(result);
    }
  );
};