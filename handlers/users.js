const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const db = require("../models");

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const createUser = async ({
  username,
  email,
  password,
  firstName,
  lastName,
}) => {
  try {
    const users = await db.User.findAll({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (users.length > 0) {
      return {
        message: "The username or email is already used!",
      };
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await db.User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    return newUser;
  } catch (err) {
    console.error("Error at handlers/registerHandler:", err);
    return { message: err.message };
  }
};

module.exports = {
  createUser,
};
