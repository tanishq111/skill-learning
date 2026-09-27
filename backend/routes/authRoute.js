import express from "express";
import { register, login } from "../controller/userController.js";
const router = express.Router();

router.post("/login", login);

router.post("/register", register); 


export default router; // i am exporting a router instance