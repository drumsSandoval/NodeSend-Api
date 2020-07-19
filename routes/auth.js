const express = require("express");
const router = express.Router();
const userAuth = require("../controllers/authController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
router.post(
  "/",
  [
    check("email", "email not valid").isEmail(),
    check("password", "password must not be empty").not().isEmpty(),
  ],
  userAuth.authUser
);

router.get("/", auth, userAuth.userAuth);

module.exports = router;
