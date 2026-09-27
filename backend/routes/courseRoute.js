import express from "express";
import { getCourses } from "../controller/courseController.js";
const router = express.Router();
router.get("/", getCourses);

export default router;