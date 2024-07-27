// #-------------------Enable Cross Origin Resource Sharing for TR-CORP-PORTAL Domain----------#
const allowOrigins = [
  "http://localhost",
  "http://localhost:80",
  "http://localhost:5173",
  "http://localhost:5000",
  "https://localhost",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = { corsOptions, allowOrigins };
// #-------------------------------------------------------------------------------------------#
