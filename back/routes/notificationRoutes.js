import express from "express";
import {
    getAllNotifications,
    deleteNotification,
    clearAllNotifications,
    markAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/list", getAllNotifications);
router.delete("/delete/:id", deleteNotification);
router.delete("/clear", clearAllNotifications);
router.patch("/read/:id", markAsRead);

export default router;
