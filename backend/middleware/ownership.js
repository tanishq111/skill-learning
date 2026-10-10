import { Course } from "../models/courses.js";

export const loadOwnedCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        const ownerId = course.instructor._id ?? course.instructor;
        const isOwner = ownerId.equals(req.user.id);
        const isAdmin = req.user.role === "admin";
        if (!isOwner && !isAdmin) {
            return res.status(403).json({ error: "You do not own this course" });
        }

        req.course = course;
        next();
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid course id" });
        }
        next(error);
    }
};