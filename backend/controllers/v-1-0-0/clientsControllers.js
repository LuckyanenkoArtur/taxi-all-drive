const { json } = require("express");
const db = require("../../db/index");

const getAllClients = async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM clients_view;`);

    return res.json({
      data: query.rows,
    });
  } catch (err) {
    console.log(err);
  }
};

const addClient = async (req, res) => {
  try {
    const { firstname, lastname, surename, status, phone, comment } = req.body;

    if (!firstname || !lastname || !surename || !status || !comment || !phone) {
      return res.status(400).json({ message: "All data should be provided" });
    }

    const clientExistQuery = await db.query(
      `SELECT * FROM clients_view WHERE phone = '${phone}';`
    );

    if (clientExistQuery.rowCount >= 1)
      return res.status(400).json({ message: "Client exist" });

    const insertUser = await db.query(
      ` INSERT INTO clients (lastname, firstname, surename, status, phone, comment)
        VALUES ('${lastname}', '${firstname}', '${surename}', '${status}', '${phone}','${comment}')`
    );

    if (insertUser.rowCount === 1) {
      return res.status(200).json({
        message: "Client is created",
      });
    }

    return res.status(400).json({
      message: "While creaing user error is rised",
    });
  } catch (err) {
    console.log(err);
  }
};

const editClient = async (req, res) => {
  const { id, firstname, lastname, surename, status, phone, comment } =
    req.body;

  if (!firstname || !lastname || !surename || !status || !comment || !phone) {
    return res.status(400).json({ message: "All data should be provided" });
  }

  const updateClient = await db.query(
    `UPDATE clients
     SET lastname = '${lastname}',
         firstname = '${firstname}',
         surename = '${surename}',
         status = '${status}',
         phone = '${phone}',
         comment = '${comment}'
     WHERE id = '${id}'`
  );

  if (updateClient.rowCount === 1) {
    return res.status(200).json({
      message: "Client is created",
    });
  }

  return res.status(400).json({
    message: "While creaing user error is rised",
  });
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "All data should be provided" });
    }

    const clientExistQuery = await db.query(
      `SELECT  FROM clients_view WHERE id = '${id}';`
    );

    if (clientExistQuery.rowCount === 0)
      return res.status(400).json({ message: "Client no exist" });

    const insertUser = await db.query(
      `DELETE FROM clients WHERE id = '${id}';`
    );

    if (insertUser.rowCount === 1) {
      return res.status(200).json({
        message: "Client is created",
      });
    }

    return res.status(400).json({
      message: "While creaing user error is rised",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllClients, addClient, editClient, deleteClient };
