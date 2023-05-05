import { register, login } from "../controllers/userController"
import * as tokens from '../utils/tokens'
const express = require('express');
const router = express.Router();

router.post("/register", async (req: any, res: any, next: any) => {
    try {
        const user = await register(req.body)
        const token = tokens.createUserJwt(user)
        return res.status(201).json({ user, token })
    } catch (error) {
        next(error)
    }
})

router.post("/login", async (req: any, res: any, next: any) => {
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
  

export default router