import express from "express";
import { register, login, refresh, logout, me } from "../controller/userController.js";
import { protect, restricTo } from "../middleware/auth.js";
const router = express.Router();

router.post("/login", login);

router.post("/register", register);
router.post("/refresh", refresh);
router.get("/me",protect, me);
router.post("/logout", logout);


export default router; // i am exporting a router instance