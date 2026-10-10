import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["active", "cancelled"], default: "active" },
  amountPaidInr: { type: Number, default: 0, min: 0 },
  enrolledAt: { type: Date, default: Date.now },
});

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });
enrollmentSchema.index({ instructor: 1, enrolledAt: -1 });

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;