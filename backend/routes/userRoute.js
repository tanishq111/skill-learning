import express from "express";
import { changeUserRole } from "../controller/userController.js";
import { protect, restricToFresh } from "../middleware/auth.js";
const router = express.Router();

router.patch("/promote/:id", protect, restricToFresh("admin"), changeUserRole);

export default router;