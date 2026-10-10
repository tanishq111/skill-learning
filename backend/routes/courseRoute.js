import express from "express";
import { getCourses, getMyCourses, createCourse, updateCourse, deleteCourse, getCourseById } from "../controller/courseController.js";
import { protect, restricTo, restricToFresh } from "../middleware/auth.js";
import { loadOwnedCourse } from "../middleware/ownership.js";
import { enrollInCourse, getMyEnrollmentForCourse, listCourseStudents } from "../controller/enrollmentController.js";
const router = express.Router();

router.get("/", getCourses);
router.get("/mine", protect, restricTo("instructor"), getMyCourses);
router.get("/:id", getCourseById);
router.get("/:id/enrollment", protect, getMyEnrollmentForCourse);
router.get("/:id/students", protect, restricTo("instructor", "admin"), loadOwnedCourse, listCourseStudents);
router.post("/", protect, restricTo("instructor"), createCourse);
router.post("/:id/enroll", protect, enrollInCourse);
router.patch("/:id", protect, restricTo("instructor", "admin"), loadOwnedCourse, updateCourse);
router.delete("/:id", protect, restricToFresh("instructor", "admin"), loadOwnedCourse, deleteCourse);

export default router;

// /course/my-courses