const multer = require("multer");
const shortid = require("shortid");
const file = require("fs");

exports.uploadFile = (req, res, next) => {
  const configMulter = {
    limits: { fileSize: req.user ? 1024 * 1024 * 30 : 1024 * 1024 },
    storage: (fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + "/../public/uploads");
      },
      filename: (req, file, cb) => {
        const typeFile = file.originalname.substring(
          file.originalname.lastIndexOf("."),
          file.originalname.length
        );
        cb(null, `${shortid.generate()}${typeFile}`);
      },
    })),
  };

  const upload = multer(configMulter).single("file");

  upload(req, res, async (err) => {
    console.log(req.file);
    if (!err) {
      res.json({ data: { file: req.file.filename } });
    } else {
      console.log(err);
      return next();
    }
  });
};

exports.deleteFile = (req, res, next) => {
  if (req.file) {
    try {
      file.unlinkSync(__dirname + `/../public/uploads/${req.file}`);
      console.log("Archivo Eliminado");
    } catch (error) {
      console.log(error);
    }
  }
};
