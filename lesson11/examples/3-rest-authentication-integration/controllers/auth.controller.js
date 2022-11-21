const { User } = require("../models/user.model");
const { Conflict, Unauthorized, BadRequest, NotFound } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const nodemailer = require("nodemailer");

const { JWT_SECRET } = process.env;

// send email // TODO: move it out
async function sendRegisterEmail({ email, token }) {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "adbdee0b8852b8", // TODO: move to .env
      pass: "8fb234f2d2330f", // TODO: move to .env
    },
  });

  const url = `localhost:3000/api/auth/verify/${token}`;

  const emailBody = {
    from: "info@cinemaOnline.com",
    to: email,
    subject: "Please verify your email",
    html: `<h1> Please open this link: ${url} to verify your email <h1>`,
    text: `Please open this link: ${url} to verify your email`,
  };

  const response = await transport.sendMail(emailBody);
  console.log("Email sent", response);
}

async function verifyEmail(req, res, next) {
  const { token } = req.params;

  const user = await User.findOne({
    verifyToken: token,
  });

  // no user
  if (!user) {
    throw new NotFound("No user found");
  }

  // user exists, not verified
  if (!user.isVerified) {
    await User.findByIdAndUpdate(user._id, {
      isVerified: true,
    });
    return res.json({
      message: "Email has been successfully verified",
    });
  }

  // user exists, verified
  if (user.isVerified) {
    return res.json({
      message: "Your Email already verified",
    });
  }
}

// the same as signup
async function register(req, res, next) {
  const { email, password } = req.body;
  const verifyToken = nanoid();
  const user = new User({ email, password, verifyToken });
  try {
    await user.save();
    await sendRegisterEmail({ email, token: verifyToken });
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
// the same as signin
async function login(req, res, next) {
  // const authHeader = req.headers.authorization || "";

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("User does not exists");
  }

  if (!user.isVerified) {
    throw new Unauthorized("Email is not verified");
  }

  const isPasswordTheSame = await bcrypt.compare(password, user.password);
  if (!isPasswordTheSame) {
    throw new Unauthorized("wrong password");
  }

  const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
    expiresIn: "15m",
  });

  user.token = token;
  await User.findByIdAndUpdate(user._id, user);

  return res.json({
    data: {
      token,
    },
  });
}

// the same as signout
async function logout(req, res, next) {
  console.log("logout");
  const { user } = req;
  user.token = null;
  await User.findByIdAndUpdate(user._id, user);

  return res.json({});
}

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
};
