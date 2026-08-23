import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { CheckCircle, Loader2, XCircle, Truck } from "lucide-react";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { url, token } = useContext(ShopContext);
    const fetchOrders = async () => {
        try {
            const res = await axios.post(
                `${url}/api/order/userorders`,
                {},
                {
                    headers: { token },
                },
            );

            const data = res.data.data;

            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(
                "Fetch orders error:",
                error.response?.data || error.message,
            );

            setOrders([]);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (token) fetchOrders();
    }, [token]);

    if (loading) {
        return (
            <section className="min-h-screen  flex items-center justify-center bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white px-6">
                <div className="flex flex-col items-center">
                    <Loader2 className="w-20 h-20 animate-spin text-cyan-400 mb-6" />
                    <h2 className="text-2xl font-semibold">
                        Loading orders...
                    </h2>
                    <p className="text-gray-300 mt-2 ">Please wait a moment</p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900  min-h-screen px-6 py-10 text-white">
            <h1 className="text-3xl font-bold mt-10 mb-8 text-center ">
                My Orders
            </h1>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500 text-xl ">
                    No Orders yet...
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
                    {orders.map((order) => {
                        const total =
                            (order.items?.reduce(
                                (sum, item) =>
                                    sum +
                                    Number(item.price) * (item.quantity || 1),
                                0,
                            ) || 0) + 2;
                        return (
                            <div
                                key={order._id}
                                className="bg-linear-to-b from-purple-800/70 to-transparent rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transform  transition-all duration-300"
                            >
                                <div>
                                    <h2 className="text-xl font-semibold mb-2 text-white">
                                        Order ID :{" "}
                                        {order._id.slice(-6).toUpperCase()}
                                    </h2>
                                    <p className="mb-4 text-white">
                                        {order.items?.length || 0} product
                                        {order.items && order.items.length > 1
                                            ? "s"
                                            : ""}
                                    </p>
                                    <div className="space-y-2">
                                        {order.items?.map((item) => (
                                            <div
                                                key={`${order._id}-${item.id}`}
                                                className="flex justify-between items-center border-b border-white/20 pb-1"
                                            >
                                                <div className="flex items-center gap-2">
                                                    {item.image && (
                                                        <img
                                                            src={`${url}/images/${item.image}`}
                                                            className="w-12 h-12 object-cover rounded"
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

                                <div className="mt-4 flex justify-between items-center">
                                    <span
                                        className={`flex items-center gap-2 font-semibold ${
                                            order.status === "delivered"
                                                ? "text-green-500"
                                                : order.status === "on the way"
                                                  ? "text-cyan-400"
                                                  : "text-yellow-500"
                                        }`}
                                    >
                                        {order.status === "delivered" && (
                                            <CheckCircle />
                                        )}

                                        {order.status === "pending" && (
                                            <Loader2 className="animate-spin" />
                                        )}

                                        {order.status === "on the way" && (
                                            <Truck />
                                        )}

                                        {order.status}
                                    </span>
                                    <span className="font-bold text-gray-100 text-sm">
                                        Total :${total}
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

export default MyOrders;
