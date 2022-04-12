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

// MIDDLEWARE CREATEPOST pour céer les messages
exports.createPost = (req, res, next) => {
  const username = req.body.username;
  const content = req.body.content;
  const dateCreation = Date.now();

  db.run(
    `INSERT INTO posts(date_publication, user_id, content) VALUES (?, ?, ?)`,
    [dateCreation, username, content],
    // modifier ca ? "username" doit être remplacé par le username loggé au moment du post
    function (err, result) {
      if (err) {
        return res.status(500).json(err.message);
      }
      res.status(201).json({ message: "Post crée !" });
    }
  );
};
// FIN MIDDLEWARE

// MIDDLEWARE DELETEPOST pour supprimer les messages
exports.deletePost = (req, res, next) => {
  const postID = req.params.id;
  const userID = req.userID;

  db.run(
    `DELETE FROM posts WHERE userID = ? AND postID = ?`,
    [userID, postID],
    function (err, result) {
      if (err) {
        return res.status(500).json(err.message);
      }
      res.status(200).json({ message: "Post supprimé !" });
    }
  );
};

// FIN MIDDLEWARE

// MIDDLEWARE GETALLPOSTS pour obtenir tous les messages
exports.getAllPosts = (req, res, next) => {
  db.all(
    `SELECT DISTINCT content FROM posts ORDER BY date_publication`,
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
// FIN MIDDLEWARE

// MIDDLEWARE GETONEPOST pour obtenir un message
exports.getOnePost = (req, res, next) => {
  const userID = res.userID;
  const postID = req.params.id;

  db.get(
    `SELECT content FROM posts WHERE post.id = ?`,
    [post.id],
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
// FIN MIDDLEWARE
