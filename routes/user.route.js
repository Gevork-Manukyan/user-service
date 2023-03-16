const express = require('express');
const tokens = require('../utils/tokens');
const security = require('../middleware/security');
const router = express.Router();
const { register } = require("../controllers/userController")

router.post("/register", async (req, res, next) => {
    try {
        const user = await register(req.body)
        const token = tokens.createUserJwt(user)
        return res.status(201).json({ user, token })
    } catch (error) {
        next(error)
    }
})

router.post("/login", async (req, res, next) => {
    try {
      const user = await login(req.body);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = tokens.createUserJwt(user);
      return res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  });
  

module.exports = router