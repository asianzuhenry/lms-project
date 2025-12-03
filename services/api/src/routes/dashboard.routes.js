import express from "express";
import { getCourses } from "../controllers/dashboard.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/roles.middleware.js";


const router = express.Router();

// Only allow admin
// router.get("/users", protect, allowRoles("admin"), getUsers);
router.get("/courses", protect, allowRoles("student", "instructor", "admin"), getCourses);

export default router;
