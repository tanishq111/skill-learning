import express from "express";
import { promoteToInstructor } from "../controller/userController.js";
import { protect, restricTo } from "../middleware/auth.js";
const router = express.Router();

router.patch("/promote/:id", protect, restricTo("admin"), promoteToInstructor);

export default router;