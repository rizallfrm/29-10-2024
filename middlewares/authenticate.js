const jwt = require("jsonwebtoken");
const { Users } = require("../models");
// middleware/authenticate.js
module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(401).json({
        status: "Failed",
        message: "Token is missing",
        isSuccess: false,
        data: null,
      });
    }

    const token = bearerToken.split("Bearer ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findByPK(payload.userId);

    // if (bearerToken && req.headers.authorization !== "test") {
    //   return res.status(401).json({
    //     status: "Failed",
    //     message: "You are not authorized",
    //     isSuccess: false,
    //     data: null,
    //   });
    // }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      message: "You are not authorized",
      isSuccess: false,
      data: null,
    });
  }
};
