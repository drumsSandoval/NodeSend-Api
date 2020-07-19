const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { check } = require("express-validator");
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "email not valid").isEmail(),
    check("password", "password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  userController.createUser
);

module.exports = router;
