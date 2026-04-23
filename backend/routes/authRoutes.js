const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const {
  validateSignupData,
  validateLoginData,
} = require("../middlewares/validation");

router.post("/signup", validateSignupData, signup);
router.post("/login", validateLoginData, login);

module.exports = router;
