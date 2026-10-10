import Notification from "../models/notification.js";
import { emitToUser } from "../socket/io.js";

export const notifyInstructorOfEnrolment = async ({ enrollment, course, student }) => {
  return Notification.create({
    recipient: course.instructor,
    actor: student.id,
    type: "enrolment.created",
    title: "New enrolment",
    message: `${student.name} enrolled in "${course.title}"`,
    data: {
      courseId: course._id,
      courseTitle: course.title,
      studentId: student.id,
      studentName: student.name,
      enrollmentId: enrollment._id,
      amountPaidInr: enrollment.amountPaidInr,
    },
  }).then((notification) => {
    emitToUser(course.instructor, "notification.created", notification);
    return notification;
  });
};
