const cors = require("cors");
const express = require("express");
const path = require("path");
const { corsOptions } = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const credentials = require("./middlewares/credentials");
const verifyJWT = require("./middlewares/verifyJWT");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public")); //Setup the public folder for sending photos
app.unsubscribe(credentials);
app.use(cors(corsOptions)); // Enable CORS
app.use(cookieParser());
app.use(express.json()); // Enable JSON data to be handled\

// #--------------------------------------Routers Version 1.0.0----------------------------------------------#
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/api/v-1-0-0/auth"));
app.use(verifyJWT); //Veryfy AccessTokens
app.use("/clients", require("./routes/api/v-1-0-0/clients"));
app.use("/veichels", require("./routes/api/v-1-0-0/veichels"));
app.use("/drivers", require("./routes/api/v-1-0-0/drivers"));
app.use("/orders", require("./routes/api/v-1-0-0/orders"));
app.use("/dispatchers", require("./routes/api/v-1-0-0/dispatchers"));
app.use("/userprofile", require("./routes/api/v-1-0-0/userprofile"));
app.use("/autocompletes", require("./routes/api/v-1-0-0/autocompletes"));

// Router Handler for 404
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  }
});

// #-------------------------------------------------------------------------------------------#

app.listen(port, (err) => {
  if (err) console.log(err.message);
  console.log(`Server is running on port ${port}`);
});
