const db = require("../../db/index");

const getDispatchers = async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM dispatchers_view;`);

    return res.json({
      data: query.rows,
    });
  } catch (err) {
    console.log(err);
  }
};
const addDispatcher = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      surename,
      phone,
      comment,
      username,
      password,
      address,
      email,
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !surename ||
      !phone ||
      !comment ||
      !username ||
      !password ||
      !address ||
      !email
    ) {
      return res.status(400).json({ message: "All data should be provided" });
    }

    const userExistQuery = await db.query(
      `SELECT * FROM users WHERE username = '${username}';`
    );

    const dispatcherExistQuery = await db.query(
      `SELECT * FROM dispatchers_view WHERE username = '${username}';`
    );

    if (dispatcherExistQuery.rowCount >= 1)
      return res.status(400).json({ message: "Client exist" });
    if (userExistQuery.rowCount >= 1)
      return res.status(400).json({ message: "Client exist" });

    const insertUser = await db.query(
      ` INSERT INTO users (  username, 
                             password)
        VALUES            ('${username}', 
                           '${password}')`
    );

    if (insertUser.rowCount !== 1) {
      return res.status(400).json({
        message: "Client is not created",
      });
    }

    const userQuery = await db.query(
      `SELECT id FROM users WHERE username = '${username}';`
    );

    const insertDispatcher = await db.query(
      ` INSERT INTO dispatchers (
                                  user_id,
                                  position,
                                  lastname,
                                  firstname,
                                  surename,
                                  phone,
                                  email,
                                  address,
                                  comment)
        VALUES            ('${userQuery.rows[0].id}',
                           'Диспечер',
                           '${lastname}',
                           '${firstname}',
                           '${surename}',
                           '${phone}',
                           '${email}',
                           '${address}',
                           '${comment}')`
    );

    if (insertDispatcher.rowCount === 1) {
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
const editDispatcher = async (req, res) => {
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
const deleteDispatcher = async (req, res) => {
  try {
    const { id } = req.body;

    console.log(id);

    if (!id) {
      return res.status(400).json({ message: "All data should be provided" });
    }

    const userExistQuery = await db.query(
      `SELECT * FROM users WHERE id = '${id}';`
    );
    const dispatcherExistQuery = await db.query(
      `SELECT * FROM dispatchers WHERE user_id = '${id}';`
    );

    if (dispatcherExistQuery.rowCount === 0)
      return res.status(400).json({ message: "Client exist" });
    if (userExistQuery.rowCount === 0)
      return res.status(400).json({ message: "Client exist" });

    const deleteDispatcher = await db.query(
      `DELETE FROM dispatchers WHERE user_id = '${id}';`
    );
    const deleteUser = await db.query(`DELETE FROM users WHERE id = '${id}';`);

    if (deleteUser.rowCount === 1) {
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
  getDispatchers,
  addDispatcher,
  editDispatcher,
  deleteDispatcher,
};
