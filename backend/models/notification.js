import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  actor:     { type: mongoose.Schema.Types.ObjectId, ref: "User" },   // who caused it

  type: {
    type: String,
    required: true,
    enum: ["enrolment.created", "enrolment.cancelled", "course.published", "review.created"],
  },

  title:   { type: String, required: true },
  message: { type: String, required: true },
  readAt: { type: Date, default: null },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

// The inbox query: newest first, for one user.
notificationSchema.index({ recipient: 1, createdAt: -1 });

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
