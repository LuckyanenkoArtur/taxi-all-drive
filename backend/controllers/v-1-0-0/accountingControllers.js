const db = require("../../db/index");

const buyTicket = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { entertainment_id = 1 } = req.body;

    const insertData = await db.query(
      `INSERT INTO entertainment_brought_tickets (entertainment_id, user_id, transaction_date) VALUES (${entertainment_id}, '${user_id}', '21.05.2024 15:20}')`
    );

    console.log(insertData.rows);

    return res.json({ success: 1 });
  } catch (err) {
    console.log(err);
  }
};

const returnBroughtTicket = async (req, res) => {
  try {
    const { ticket_id = 1 } = req.body;
    const query = await db.query(
      ` SELECT * 
          FROM
            entertainment_brought_tickets ebt
            JOIN users u ON ebt.user_id = u.id
            JOIN entertainments_view e ON ebt.entertainment_id = e.id
          WHERE
            ebt.id = ${ticket_id};`
    );

    if (query.rowCount === 1) {
      const deleteData = await db.query(
        `DELETE
        FROM
            entertainment_brought_tickets ebt
        WHERE
            ebt.id = ${ticket_id};`
      );
      return res.json({ success: 1 });
    }

    return res.json({ success: 0 });
  } catch (error) {
    console.log(error);
  }
};
const showTicket = async (req, res) => {
  try {
    const { ticket_id = 1 } = req.body;
    const query = await db.query(
      ` SELECT
                  ebt.id,
                  u.username,
                  e.title,
                  e.type,
                  e.date,
                  e.address,
                  e.age_limit,
                  e.price
              FROM
                  entertainment_brought_tickets ebt
                  JOIN users u ON ebt.user_id = u.id
                  JOIN entertainments_view e ON ebt.entertainment_id = e.id
              WHERE
                  ebt.id = ${ticket_id};`
    );
    const queryResult = query.rows;

    return res.json({
      data: queryResult,
    });
  } catch (error) {
    console.log(error);
  }
};
const allBroughtTickets = async (req, res) => {
  try {
    const user_id = req.user_id;
    const query = await db.query(
      ` SELECT
                  ebt.id,
                  u.username,
                  e.title,
                  e.date,
                  e.price,
                  e.age_limit
              FROM
                  entertainment_brought_tickets ebt
                  JOIN users u ON ebt.user_id = u.id
                  JOIN entertainments_view e ON ebt.entertainment_id = e.id
              WHERE
                  ebt.user_id = ${user_id};`
    );

    const queryResult = query.rows;
    res.json({
      data: queryResult,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  buyTicket,
  showTicket,
  allBroughtTickets,
  returnBroughtTicket,
};
