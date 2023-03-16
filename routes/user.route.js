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

module.exports = router