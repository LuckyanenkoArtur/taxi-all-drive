const db = require("../../db/index");

const getOrders = async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM orders_view;`);
    console.log(query.rows);
    return res.status(200).json({
      data: query.rows,
    });
  } catch (err) {
    console.log(err);
  }
};
const addOrder = async (req, res) => {
  try {
    const {
      driver,
      client,
      pay_method,
      status,
      destination_address,
      pickup_address,
      price,
      order_time = "20/07/24 19:57",
    } = req.body;

    if (
      !driver ||
      !client ||
      !pay_method ||
      !status ||
      !destination_address ||
      !pickup_address ||
      !price
    ) {
      return res.status(400).json({ message: "All data should be provided" });
    }

    const insertOder = await db.query(
      ` INSERT INTO orders (     driver_id,
                                 client_id,
                                 pay_method,
                                 status,
                                 destination_address,
                                 pickup_address,
                                 price,
                                 order_time)
            VALUES ('${driver}',
                    '${client}',
                    '${pay_method}',
                    '${status}',
                    '${destination_address}',
                    '${pickup_address}',
                    '${price}',
                    '${order_time}')`
    );

    if (insertOder.rowCount === 1) {
      return res.status(200).json({
        message: "Client is created",
      });
    }

    return res.status(400).json({
      message: "While creaing user error is rised",
    });

    return res.status(200);
  } catch (err) {
    console.log(err);
  }
};
const editOrder = async (req, res) => {
  const {
    id,
    driver,
    client,
    pay_method,
    status,
    destination_address,
    pickup_address,
    price,
  } = req.body;
  if (
    !driver ||
    !client ||
    !pay_method ||
    !status ||
    !destination_address ||
    !pickup_address ||
    !price
  ) {
    return res.status(400).json({ message: "All data should be provided" });
  }

  const updateDriver = await db.query(
    `UPDATE orders
     SET driver_id = '${driver}', 
         client_id = '${client}', 
         status = '${status}', 
         destination_address = '${destination_address}', 
         pickup_address = '${pickup_address}', 
         price = '${price}'
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
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "All data should be provided" });
    }

    const driverExistQuery = await db.query(
      `SELECT * FROM orders_view WHERE id = '${id}';`
    );

    if (driverExistQuery.rowCount === 0)
      return res.status(400).json({ message: "Client no exist" });

    const deleteDriver = await db.query(
      `DELETE FROM orders WHERE id = '${id}';`
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

module.exports = { deleteOrder, getOrders, addOrder, editOrder };
