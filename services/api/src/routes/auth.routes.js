import express from "express";
import { register, login, logout, checkAuthStatus } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check", checkAuthStatus);



export default router;
