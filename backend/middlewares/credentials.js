const { allowOrigins } = require("../config/corsOptions");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
