const db = require("../../db/index");

const getAllDrivers = async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM drivers_view;`);

    return res.json({
      data: query.rows,
    });
  } catch (err) {
    console.log(err);
  }
};
const addDriver = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      surename,
      birthday,
      phone,
      address,
      vehicle = "0",
      status,
      driver_licence_category,
      driver_licence,
      comment = "Отсуствует",
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !surename ||
      !birthday ||
      !phone ||
      !address ||
      !vehicle ||
      !status ||
      !driver_licence_category ||
      !driver_licence
    ) {
      return res.status(400).json({ message: "All data should be provided" });
    }

    const driverExistQuery = await db.query(
      `SELECT * FROM drivers_view WHERE phone = '${phone}';`
    );

    if (driverExistQuery.rowCount >= 1)
      return res.status(400).json({ message: "Client exist" });

    const insertDriver = await db.query(
      ` INSERT INTO drivers (lastname, 
                             firstname, 
                             surename, 
                             phone, 
                             address, 
                             driver_licence, 
                             driver_licence_category, 
                             drive_experience, 
                             vehicle_id, 
                             birthday, 
                             status, 
                             comment)
        VALUES ('${lastname}', 
                '${firstname}', 
                '${surename}', 
                '${phone}',
                '${address}',
                '${driver_licence}',
                '${driver_licence_category.map((item) => {
                  return item.category;
                })}',
                '${0}',
                '${vehicle}',
                '${birthday}',
                '${status}',
                '${comment}')`
    );

    if (insertDriver.rowCount === 1) {
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

const editDriver = async (req, res) => {
  const {
    id,
    firstname,
    lastname,
    surename,
    birthday,
    phone,
    address,
    vehicle = "0",
    status,
    driver_licence_category,
    driver_licence,
    comment = "Отсуствует",
  } = req.body;
  if (
    !firstname ||
    !lastname ||
    !surename ||
    !birthday ||
    !phone ||
    !address ||
    !vehicle ||
    !status ||
    !driver_licence_category ||
    !driver_licence
  ) {
    return res.status(400).json({ message: "All data should be provided" });
  }

  const updateDriver = await db.query(
    `UPDATE drivers
     SET lastname = '${lastname}', 
         firstname = '${firstname}', 
         surename = '${surename}', 
         phone = '${phone}', 
         address = '${address}', 
         driver_licence = '${driver_licence}', 
         driver_licence_category = '${driver_licence_category.map((item) => {
           return item.category;
         })}', 
         drive_experience = '0', 
         vehicle_id = '${vehicle}', 
         birthday = '${birthday}', 
         status = '${status}', 
         comment = '${comment}'
     WHERE id = '${id}'`
  );

  if (updateDriver.rowCount === 1) {
    return res.status(200).json({
      message: "Client is created",
    });
  }

  return res.status(400).json({
    message: "While creaing user error is rised",
  });
};

const deleteDriver = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "All data should be provided" });
    }

    const driverExistQuery = await db.query(
      `SELECT * FROM drivers_view WHERE id = '${id}';`
    );

    if (driverExistQuery.rowCount === 0)
      return res.status(400).json({ message: "Client no exist" });

    const deleteDriver = await db.query(
      `DELETE FROM drivers WHERE id = '${id}';`
    );

    if (deleteDriver.rowCount === 1) {
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
  getAllDrivers,
  addDriver,
  editDriver,
  deleteDriver,
};
