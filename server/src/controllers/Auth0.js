const axios = require("axios");
const { Op } = require("sequelize");
const { User } = require("../db.js");

const getUserInfo = async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const response = await axios.get(
      "https://16bit-game-store.us.auth0.com/userinfo",
      { headers: { authorization: `Bearer ${accessToken}` } }
    );
    const userInfo = response.data;
    res.status(200).send(userInfo);
  } catch (error) {
    console.log(error);
  }
};

const signIn = async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const response = await axios.get(
      "https://16bit-game-store.us.auth0.com/userinfo",
      { headers: { authorization: `Bearer ${accessToken}` } }
    );
    const userInfo = response.data;

    const { nickname, email, given_name, family_name, picture } = userInfo;

    const user = await User.findOrCreate({
      where: { [Op.or]: [{ nickname_user: nickname }, { email_user: email }] },
      defaults: {
        nickname_user: nickname,
        name_user: given_name,
        lastname_user: family_name,
        avatar_user: picture,
        email_user: email,
      },
    });

    res.send({
      data: {
        token: accessToken,
        username: user[0].nickname_user,
        email: user[0].email_user,
        name: user[0].name_user,
        lastname: user[0].lastname_user,
        picture: user[0].avatar_user,
      },
      id: user[0].id_user,
    });
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getUserInfo: getUserInfo, signIn: signIn };
