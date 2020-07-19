const express = require("express");
const router = express.Router();
const linkController = require("../controllers/linkController");
const fileController = require("../controllers/fileController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
  "/",
  [
    check("name", "upload a file").not().isEmpty(),
    check("originalName", "Upload a file").not().isEmpty(),
  ],
  auth,
  linkController.createLink
);

router.get("/:url", linkController.getLink, fileController.deleteFile);

module.exports = router;
