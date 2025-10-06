const express = require("express");
const { register, login } = require("../controllers/userControllers");
const { registerValidator, loginValidator } = require("../validators/userValidator");
const { validationResult } = require("express-validator");

const router = express.Router();

router.post("/register", registerValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}, register);

router.post("/login", loginValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}, login);

module.exports = router;   
