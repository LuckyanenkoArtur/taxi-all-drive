const db = require("../../db/index");

const getUserprofileInformation = async (req, res) => {
  try {
    const user_id = req.user_id;

    console.log(user_id);

    const query = await db.query(
      ` SELECT * FROM accounts_view
        WHERE accounts_view.id = '${user_id}';`
    );

    const queryResult = query.rows[0];

    return res.json({
      data: queryResult,
    });

    // res.status(200);
  } catch (error) {
    console.log(error);
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const user_id = req.user_id;
    const username = req.user;

    const queryCheckExistUser = await db.query(
      `SELECT * FROM users WHERE users.username = '${username}';`
    );
    const queryCheckExistUserDetatils = await db.query(
      `SELECT * FROM users_details WHERE users_details.user_id = '${user_id}';`
    );

    if (
      queryCheckExistUser.rowCount === 0 ||
      queryCheckExistUserDetatils.rowCount === 0
    )
      return res.json({
        success: 0,
        message: "While deleting an user, there was an error",
      });

    const deleteUserDetails = await db.query(
      `DELETE FROM users_details WHERE user_id = ${user_id}`
    );

    const deleteTickets = await db.query(
      `DELETE FROM entertainment_brought_tickets WHERE user_id = ${user_id}`
    );

    if (deleteUserDetails.rowCount) {
      const deleteUser = await db.query(
        `DELETE FROM users WHERE id = ${user_id}`
      );
    }

    res.clearCookie("refreshToken", { httpOnly: true });
    return res.status(200).json({
      success: 1,
      message: "User is deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUserprofileInformation, deleteUserProfile };
