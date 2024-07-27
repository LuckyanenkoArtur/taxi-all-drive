const { json } = require("express");
const db = require("../../db/index");

const getAllVeichels = async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM vehicles_view;`);

    return res.json({
      data: query.rows,
    });
  } catch (err) {
    console.log(err);
  }
};

const addVeichel = async (req, res) => {
  try {
    const { model, color, licence_plate, condition, fuel_type, comment } =
      req.body;

    if (
      !model ||
      !color ||
      !licence_plate ||
      !condition ||
      !fuel_type ||
      !comment
    ) {
      return res.status(400).json({ message: "All data should be provided" });
    }

    const veichelExistQuery = await db.query(
      `SELECT * FROM vehicles_view WHERE licence_plate = '${licence_plate}';`
    );

    if (veichelExistQuery.rowCount >= 1)
      return res.status(400).json({ message: "Vehicle exist" });

    const insertVeichel = await db.query(
      ` INSERT INTO vehicles (model, color, licence_plate, tech_condition, fuel_type, comment)
        VALUES ('${model}', '${color}', '${licence_plate}', '${condition}', '${fuel_type}','${comment}')`
    );

    if (insertVeichel.rowCount === 1) {
      return res.status(200).json({
        message: "Veichel is created",
      });
    }

    return res.status(400).json({
      message: "While creaing user error is rised",
    });
  } catch (err) {
    console.log(err);
  }
};

const editVeichel = async (req, res) => {
  const {
    id,
    model,
    color,
    licence_plate,
    tech_condition,
    fuel_type,
    comment,
  } = req.body;

  if (
    !model ||
    !color ||
    !licence_plate ||
    !tech_condition ||
    !fuel_type ||
    !comment
  ) {
    return res.status(400).json({ message: "All data should be provided" });
  }

  const updateVechicle = await db.query(
    `UPDATE vehicles
     SET model = '${model}',
         color = '${color}',
         tech_condition = '${tech_condition}',
         fuel_type = '${fuel_type}',
         licence_plate = '${licence_plate}',
         comment = '${comment}'
     WHERE id = '${id}'`
  );

  if (updateVechicle.rowCount === 1) {
    return res.status(200).json({
      message: "Client is created",
    });
  }

  return res.status(400).json({
    message: "While creaing user error is rised",
  });
};

const deleteVeichel = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "All data should be provided" });
    }

    const clientExistQuery = await db.query(
      `SELECT * FROM vehicles_view WHERE id = '${id}';`
    );

    if (clientExistQuery.rowCount === 0)
      return res.status(400).json({ message: "Client no exist" });

    const insertUser = await db.query(
      `DELETE FROM vehicles WHERE id = '${id}';`
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

module.exports = {
  getAllVeichels,
  addVeichel,
  editVeichel,
  deleteVeichel,
};
