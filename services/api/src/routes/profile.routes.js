import express from "express";
import { getUserDetails } from "../controllers/profile.controller.js";
import { protect } from "../middlewares/protected.middleware.js";

const router = express.Router();

router.get("/profile", protect, getUserDetails);

export default router;