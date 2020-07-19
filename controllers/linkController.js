const Link = require("../models/Link");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.createLink = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ data: { errors: errors.array().map((err) => err.msg) } });
  }
  const { originalName } = req.body;
  const link = new Link();
  link.url = shortid.generate();
  link["name"] = shortid.generate();
  link.originalName = originalName;
  if (req.user) {
    const { password, downloads } = req.body;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      link.password = await bcrypt.hash(password, salt);
    }
    if (downloads) {
      link["downloads"] = downloads;
    }
    link.author = req.user._id;
  }
  try {
    await link.save();
    res.json({ data: { url: `${link.url}` } });
    next();
  } catch (error) {
    console.log(error);
  }
};

exports.getLink = async (req, res, next) => {
  const { url } = req.params;
  const link = await Link.findOne({ url });
  if (!link) {
    res.status(404).json({ data: { errors: "Ese enlace no existe" } });
    return next();
  }
  res.json({ data: { file: link.name } });
  const { dowloads, name } = link;

  if (dowloads === 1) {
    req.file = name;
    await Link.findByIdAndDelete(req.params.url);
    next();
  } else {
    link.dowloads--;
    await link.save();
  }
};
