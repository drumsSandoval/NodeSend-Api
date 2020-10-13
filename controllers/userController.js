const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
exports.createUser = async (req, res) => {
  // show messages express-validators
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ data: { errors: errors.array().map((err) => err.msg) } });
  }
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res
      .status(409)
      .json({ data: { msg: "El usuario ya esta registrado" } });
  }
  // create new user

  user = new User(req.body);
  // hashear password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  try {
    await user.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: { msg: "Error en el servidor al guardar el usuario :( " },
    });
  }

  res.json({ data: { msg: "Usuario creado correctamente" } });
};
