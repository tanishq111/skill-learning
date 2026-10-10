import Enrollment from "../models/enrollment.js";
import { Course } from "../models/courses.js";
import { notifyInstructorOfEnrolment } from "../service/notificationservice.js";

export const enrollInCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).select("title instructor status priceInr");
    if (!course || course.status !== "published") {
      return res.status(404).json({ error: "Course not found" });
    }

    if (course.instructor.equals(req.user.id)) {
      return res.status(400).json({ error: "You cannot enrol in your own course" });
    }

    const enrollment = await Enrollment.create({
      student: req.user.id,
      course: course._id,
      instructor: course.instructor,         
      amountPaidInr: course.priceInr,                       
    });

    // Fire-and-forget: a failed notification must not fail the enrolment.
    notifyInstructorOfEnrolment({ enrollment, course, student: req.user })
      .catch((err) => console.error("[notify] failed", { enrollmentId: enrollment._id, err }));

    res.status(201).json({ data: enrollment });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "You are already enrolled in this course" });
    }
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid course id" });
    }
    next(err);
  }
};


export const getMyEnrollmentForCourse = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findOne({
      student: req.user.id,
      course: req.params.id,
    }).lean();

    res.status(200).json({ data: { enrolled: Boolean(enrollment), enrollment } });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid course id" });
    }
    next(err);
  }
};

// GET /courses/:id/students — roster for a course the caller owns.
export const listCourseStudents = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ course: req.course._id })
      .populate("student", "name email")
      .sort({ enrolledAt: -1 })
      .limit(100)
      .lean();

    res.status(200).json({ data: enrollments, meta: { count: enrollments.length } });
  } catch (err) {
    next(err);
  }
};
