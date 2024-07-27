const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeaders = req.headers.authorization || req.headers.Authorization;
  if (!authHeaders?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeaders.split(" ")[1];
  jwt.verify(token, "myAccessTokenSecret", (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded.UserInforamation.username;
    req.user_id = decoded.UserInforamation.user_id;
    next();
  });
};

module.exports = verifyJWT;
