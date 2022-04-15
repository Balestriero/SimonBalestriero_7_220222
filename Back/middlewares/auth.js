const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const decodedToken = jwt.verify(token, "motdepasse");
    const userId = decodedToken.username;
    if (req.body.username && req.body.username !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
