const app = require("../server");
const jwt = require("jsonwebtoken");
const getToken = req => req.headers["x-access-token"];

const checkToken = (req, res, next) => {
  const token = getToken(req);
  const secretKey = app.get("superSecret");

  if (!token) {
    return res.status(403).send({
      success: false,
      message: "No token provided"
    });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.json({
        status: "FAILED",
        errorMessage: "Failed to authenticate"
      });
    }

    next();
  });
};

module.exports = checkToken;
