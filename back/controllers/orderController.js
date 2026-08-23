import notificationsModel from "../models/notificationModels.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId: req.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(Number(item.price) * 100),
            },
            quantity: item.quantity,
        }));

        // Delivery
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 200,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",

            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,

            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({
            success: true,
            session_url: session.url,
        });
    } catch (error) {
        console.log("Place Order Error:", error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            const order = await orderModel
                .findById(orderId)
                .populate("userId", "name email");
            await notificationsModel.create({
                message: `تم دفع الطلب رقم ${orderId} بنجاح المستخدم ${order?.userId?.name || "غير معروف"}`,
                orderId: order._id,
                user: order?.userId?.name,
            });
            res.json({
                success: true,
                message: "Paid",
            });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({
                success: false,
                message: "Not Paid",
            });
        }
    } catch (error) {
        console.log("Verify Order Error:", error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ userId: req.userId })
            .sort({ date: -1 });

        console.log("Orders fetched from DB:", JSON.stringify(orders, null, 2));

        res.json({
            success: true,
            data: orders,
        });
    } catch (error) {
        console.log("User Orders Error:", error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ date: -1 });

        const ordersWithUser = await Promise.all(
            orders.map(async (order) => {
                const user = await userModel.findById(order.userId);

                return {
                    ...order.toObject(),

                    user: user
                        ? {
                              name: user.name,
                              email: user.email,
                          }
                        : null,
                };
            }),
        );

        res.json({
            success: true,
            data: ordersWithUser,
        });
    } catch (error) {
        console.log("List Orders Error:", error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        console.log("========== UPDATE STATUS ==========");
        console.log("Order ID:", orderId);
        console.log("Status:", status);

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            {
                status: status,
            },
            {
                new: true,
                runValidators: true,
            },
        );

        if (!updatedOrder) {
            console.log("Order not found");

            return res.json({
                success: false,
                message: "Order not found",
            });
        }

        console.log("Updated status:", updatedOrder.status);

        res.json({
            success: true,
            message: "Status Updated",
            data: updatedOrder,
        });
    } catch (error) {
        console.log("UPDATE STATUS ERROR:", error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
