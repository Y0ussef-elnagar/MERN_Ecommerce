import notificationsModel from "../models/notificationModels.js";
import orderModel from "../models/orderModel.js";

export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await notificationsModel
            .find()
            .sort({ createdAt: -1 });
        res.json({ success: true, data: notifications });
    } catch (error) {
        console.error("خطأ في جلب الاشعارات❌:", error);
        res.status(500).json({ success: false, message: "خطأ في السيرفر" });
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        await notificationsModel.findByIdAndDelete(id);
        res.json({ success: true, message: "تم حذف الإشعار" });
    } catch (error) {
        res.status(500).json({ success: false, message: "فشل في الحذف" });
    }
};

export const clearAllNotifications = async (req, res) => {
    try {
        await notificationsModel.deleteMany({});
        res.json({ success: true, message: "تم حذف كل الإشعارات" });
    } catch (error) {
        res.status(500).json({ success: false, message: "فشل في الحذف الكلي" });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        await notificationsModel.findByIdAndUpdate(id, { isRead: true });
        res.json({ success: true, message: "تم تحديد الاشعار كمقروء" });
    } catch (error) {
        res.status(500).json({ success: false, message: "فشل في التحديث" });
    }
};

export const createNotificationForOrder = async (orderData) => {
    try {
        const { userId, _id } = orderData;
        await notificationsModel.create({
            message: `تم إنشاء طلب جديد برقم ${_id} 🛒`,
            orderId: _id,
            user: userId || "مستخدم مجهول",
        });
    } catch (error) {
        console.error("فشل في إنشاء إشعار❌:", error);
    }
};
