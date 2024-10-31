const { Auths, Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    res.status(201).json({
      status: "Success",
      data: {},
    });
  } catch (err) {}
};

const login = async (req, res, next) => {
  console.log("masuk?");
  try {
    const { email, password } = req.body;

    const user = await Auths.findOne({
      include: [
        {
          model: Users,
          as: "user",
        },
      ],
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "Email not registered",
        isSuccess: false,
        data: null,
      });
    }
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.user.name,
          email: user.email,
          userId: user.user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRED,
        }
      );
      res.status(200).json({
        status: "Success",
        message: "login Successfully ",
        data: {
          username: user.name,
          token},
      });
    } else {
      return res.status(401).json({
        status: "Failed",
        message: "Wrong password",
        isSuccess: false,
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
      data: null,
    });
  }
};

const authenticate = async (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {}
};

module.exports = {
  register,
  login,
  authenticate,
};
