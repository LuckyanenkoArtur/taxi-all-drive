const jwt = require("jsonwebtoken");
const db = require("../../db/index");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    if (!username || !password) {
      console.log("Username and password are required");
      return res
        .status(400)
        .json({ message: "Имя пользователя или пароль необходимо заполнить!" });
    }

    const queryGetUserInfo = await db.query(
      `SELECT id, username, password FROM users WHERE users.username = '${username}';`
    );

    if (queryGetUserInfo.rowCount === 0) {
      return res.status(400).json({
        message: "Unathorized",
        code: 401,
        descriprion: "Проверьте вводимые данные!",
      });
    }

    const usersCredentials = queryGetUserInfo.rows[0];

    if (usersCredentials.password !== password) {
      return res.status(400).json({
        message: "Unathorized",
        code: 401,
        descriprion: "Проверьте вводимые данные!",
      });
    }

    const acessToken = jwt.sign(
      {
        UserInforamation: {
          username: usersCredentials.username,
          user_id: usersCredentials.id,
        },
      },
      "myAccessTokenSecret",
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      { username: usersCredentials.username, user_id: usersCredentials.id },
      "myRefreshTokenSecret",
      {
        expiresIn: "3600s",
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ acessToken });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  res.clearCookie("refreshToken", { httpOnly: true });
  return res.sendStatus(204);
};

module.exports = { login, logout };
