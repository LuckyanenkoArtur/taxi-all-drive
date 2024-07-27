const router = require("express").Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.status(200).sendFile(path.join(__dirname, "..", "views", "index.html"));
});
module.exports = router;
