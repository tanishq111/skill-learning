import express from "express";
import { getCourses, getMyCourses, createCourse, updateCourse } from "../controller/courseController.js";
import { protect , restricTo } from "../middleware/auth.js";
const router = express.Router();

router.get("/", getCourses);
router.get("/my-courses", protect, restricTo("instructor"), getMyCourses);
router.post("/", protect, restricTo("instructor"), createCourse);
router.put("/:id", protect, restricTo("instructor"), updateCourse);

export default router;

// /course/my-courses