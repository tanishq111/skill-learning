import express from "express";
import { protect } from "../middleware/auth.js";
import {
  listNotifications,
  markRead,
  markAllRead,
} from "../controller/notificationController.js";

const router = express.Router();

router.use(protect); // every route below requires a login

router.get("/", listNotifications);
router.patch("/read-all", markAllRead); // must stay above /:id/read
router.patch("/:id/read", markRead);

export default router;
