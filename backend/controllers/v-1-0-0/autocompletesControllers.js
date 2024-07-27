const db = require("../../db/index");

const clients = async (req, res) => {
  try {
    const clientsListQuery = await db.query(`SELECT * FROM clients_view;`);
    res.status(200).json({ data: clientsListQuery.rows });
  } catch (error) {
    console.log(error);
  }
};

const vechels = async (req, res) => {
  try {
    const vechelsListQuery = await db.query(`SELECT * FROM vehicles_view;`);
    res.status(200).json({ data: vechelsListQuery.rows });
  } catch (error) {
    console.log(error);
  }
};

const drivers = async (req, res) => {
  try {
    const driversListQuery = await db.query(`SELECT * FROM drivers_view;`);
    res.status(200).json({ data: driversListQuery.rows });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { clients, vechels, drivers };
