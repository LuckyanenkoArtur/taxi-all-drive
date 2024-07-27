const db = require("../../db/index");

const registNewUser = async (req, res) => {
  try {
    const {
      lastname,
      firstname,
      surename,
      age,
      phone,
      email,
      username,
      password,
    } = req.body;

    const queryCheckExistUser = await db.query(
      `SELECT id, username FROM users WHERE users.username = '${username}';`
    );

    if (queryCheckExistUser.rowCount === 1) {
      return res.json({
        success: 0,
        message: "While adding to user was an error",
      });
    }

    const insertUser = await db.query(
      ` INSERT INTO users (username, password, status, creation_time, expire_time)
        VALUES ('${username}', '${password}', 'active', '21/05/2024 15:20', 'none')`
    );

    if (insertUser.rowCount === 0) {
      return res.json({
        success: 0,
        message: "While adding to user was an error",
      });
    }

    const queryGetNewUserId = await db.query(
      `SELECT id FROM users WHERE users.username = '${username}';`
    );

    if (queryGetNewUserId.rowCount === 0) {
      return res.json({
        success: 0,
        message: "While adding to user was an error",
      });
    }

    const newUserId = queryGetNewUserId.rows[0].id;

    const insertUserDetails = await db.query(
      ` INSERT INTO users_details (firstname, lastname, surename, age, phone, email, user_id)
        VALUES ('${firstname}', '${lastname}', '${surename}', '${age}', '${phone}', '${email}', ${newUserId})`
    );

    if (insertUserDetails.rowCount === 0) {
      return res.json({
        success: 0,
        message: "While adding to user was an error",
      });
    }

    return res.json({
      success: 1,
      message: "User is added",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registNewUser };
