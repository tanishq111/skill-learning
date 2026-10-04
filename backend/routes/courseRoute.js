import express from "express";
import { getCourses, getMyCourses, createCourse, updateCourse, deleteCourse, getCourseById } from "../controller/courseController.js";
import { protect , restricTo } from "../middleware/auth.js";
const router = express.Router();

router.get("/", getCourses);
router.get("/mine", protect, restricTo("instructor"), getMyCourses);
router.get("/:id", getCourseById);
router.post("/", protect, restricTo("instructor"), createCourse);
router.patch("/:id", protect, restricTo("instructor"), updateCourse);
router.delete("/:id", protect, restricTo("instructor"), deleteCourse);

export default router;

// /course/my-courses