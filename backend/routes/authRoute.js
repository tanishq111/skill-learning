import express from "express";
import { register, login, refresh } from "../controller/userController.js";
const router = express.Router();

router.post("/login", login);

router.post("/register", register);
router.post("/refresh", refresh);


export default router; // i am exporting a router instance