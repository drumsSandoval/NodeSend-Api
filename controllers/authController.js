const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config({ path: "variables.env" });

exports.authUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(401)
      .json({ data: { errors: errors.array().map((err) => err.msg) } });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ data: { errors: "El usuario no existe" } });
    return next();
  }
  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      process.env.SECRET,
      {
        expiresIn: "8h",
      }
    );
    res.json({ data: { jwt: token } });
  } else {
    res.status(401).json({ data: { errors: "Password incorrecto" } });
    return next();
  }
};

exports.userAuth = (req, res, next) => {
  if (req.user) {
    res.json({ data: { user: req.user } });
  } else {
    res.json({ data: { error: "Usuario no valido" } }, 401);
  }
};
