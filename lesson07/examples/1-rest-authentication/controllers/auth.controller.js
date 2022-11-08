const { User } = require("../models/user.model");
const { Conflict, Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;

  // const salt = await bcrypt.genSalt();
  // const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ email, password });
  try {
    await user.save();
  } catch (error) {
    if (error.message.includes("duplicate key error collection")) {
      throw new Conflict("User with this email already registered");
    }

    throw error;
  }

  return res.status(201).json({
    data: {
      user: {
        _id: user._id,
      },
    },
  });
}

/**
 * 1. check if have user with an email
 * 2. use compare function to check if hash is the same
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("User does not exists");
  }
  const isPasswordTheSame = await bcrypt.compare(password, user.password);
  if (!isPasswordTheSame) {
    throw new Unauthorized("wrong password");
  }

  const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
    expiresIn: "15m",
  });
  return res.json({
    data: {
      token,
    },
  });
}

module.exports = {
  register,
  login,
};
