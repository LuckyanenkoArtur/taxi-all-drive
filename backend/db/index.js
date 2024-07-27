const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "#15Gjcn3128Uh.#",
  host: "db-postgres",
  port: 5432,
  database: "taxi_all_drive",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
