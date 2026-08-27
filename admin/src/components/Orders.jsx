import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Orders = () => {
    const url = "http://localhost:4000";
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${url}/api/order/list`);

            if (res.data.success) {
                setOrders(res.data.data);
            } else {
                toast.error("This didn't work.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            const adminToken = localStorage.getItem("adminToken");

            console.log("Sending:");
            console.log("orderId:", orderId);
            console.log("status:", newStatus);
            console.log("adminToken:", adminToken);

            const res = await axios.post(
                `${url}/api/order/status`,
                {
                    orderId,
                    status: newStatus,
                },
                {
                    headers: {
                        token: adminToken,
                    },
                },
            );

            console.log("Backend response:", res.data);

            if (res.data.success) {
                setOrders((prev) =>
                    prev.map((order) =>
                        order._id === orderId
                            ? {
                                  ...order,
                                  status: newStatus,
                              }
                            : order,
                    ),
                );

                toast.success("Order status updated");
            } else {
                toast.error(res.data.message || "Failed to update status");
            }
        } catch (error) {
            console.error(
                "Status update error:",
                error.response?.data || error.message,
            );

            toast.error(
                error.response?.data?.message ||
                    "Failed to update order status",
            );
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <section className="min-h-screen  flex items-center justify-center bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white px-6">
                <div className="flex flex-col items-center">
                    <Loader2 className="w-20 h-20 animate-spin text-cyan-400 mb-6" />
                    <h2 className="text-2xl font-semibold">
                        Loading orders...
                    </h2>
                </div>
            </section>
        );
    }

    return (
        <section
            className="relative w-full min-h-screen bg-linear-to-r
        from-indigo-900 via-purple-900 to-pink-900
        text-white py-24 px-6 sm:px-10 md:pl-72 md:pr-6"
        >
            {orders.length === 0 ? (
                <p className="text-center text-gray-300 text-xl">
                    No orders yet 😥
                </p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full max-w-7xl mx-auto">
                    {orders.map((order) => {
                        const total = Number(order.amount || 0);

                        return (
                            <div
                                key={order._id}
                                className="w-full min-w-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col justify-between shadow-lg hover:scale-[1.02] transition-all duration-300"
                            >
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-200 mb-2">
                                        Order ID :{" "}
                                        {order._id.slice(-6).toUpperCase()}
                                    </h2>
                                    <p className="text-gray-200 mb-1">
                                        <span className="font-semibold">
                                            Customer:
                                        </span>
                                        {order.user?.name || "Unknown"}
                                    </p>
                                    <p className="text-gray-200 mb-2 text-sm">
                                        <span className="font-semibold block mb-1">
                                            Address:
                                        </span>

                                        {order.address ? (
                                            <>
                                                <span className="block">
                                                    {order.address.name}
                                                </span>

                                                <span className="block">
                                                    {order.address.address}
                                                </span>

                                                <span className="block">
                                                    {order.address.city}
                                                </span>

                                                <span className="block">
                                                    {order.address.phone}
                                                </span>
                                            </>
                                        ) : (
                                            "Not provided"
                                        )}
                                    </p>
                                    <p className="text-gray-300 text-sm mb-3">
                                        {order.items?.length || 0} product
                                        {order.items && order.items.length > 1
                                            ? "s"
                                            : ""}
                                    </p>
                                    <div className="space-y-1">
                                        {order.items?.map((item) => (
                                            <div
                                                key={`${order._id}-${item.id}`}
                                                className="flex justify-between items-center border-b border-white/20 pb-1"
                                            >
                                                <div className="flex items-center gap-2">
                                                    {item.image && (
                                                        <img
                                                            src={`${url}/images/${item.image}`}
                                                            className="w-10 h-10 object-cover rounded"
                                                        />
                                                    )}

                                                    <p className="text-gray-200 text-sm">
                                                        {item.name} x
                                                        {item.quantity || 1}
                                                    </p>
                                                </div>

                                                <p className="font-semibold text-gray-100 text-sm ">
                                                    $
                                                    {item.price *
                                                        (item.quantity || 1)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-3 flex justify-between items-center">
                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            updateStatus(
                                                order._id,
                                                e.target.value,
                                            )
                                        }
                                        className="border rounded-lg px-2 py-1 text-gray-800 font-semibold cursor-pointer text-sm"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="on the way">
                                            On the Way
                                        </option>
                                        <option value="delivered">
                                            Delivered
                                        </option>
                                    </select>
                                    <span className="font-bold text-gray-100 text-sm">
                                        Total: ${total.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default Orders;
