import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Order = () => {
    const { cartItems, all_products, getTotalCartAmount, url, token } =
        useContext(ShopContext);

    const navigate = useNavigate();

    const [shipping, setShipping] = useState({
        name: "",
        address: "",
        city: "",
        phone: "",
    });

    const cartProducts = Object.keys(cartItems)
        .map((id) => {
            const product = all_products.find(
                (p) => String(p._id) === String(id),
            );

            return product
                ? {
                      ...product,
                      quantity: cartItems[id],
                  }
                : null;
        })
        .filter(Boolean);

    const total = getTotalCartAmount();

    const handleChange = (e) => {
        setShipping((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const placeOrder = async (e) => {
        e.preventDefault();

        // Check shipping data
        if (
            !shipping.name.trim() ||
            !shipping.address.trim() ||
            !shipping.city.trim() ||
            !shipping.phone.trim()
        ) {
            alert("يرجى ملء جميع بيانات الشحن ✍️");
            return;
        }

        // Check login
        if (!token) {
            alert("يرجى تسجيل الدخول أولاً");
            navigate("/login");
            return;
        }

        // Check cart
        if (cartProducts.length === 0 || total <= 0) {
            alert("السلة فارغة 🛒");
            navigate("/cart");
            return;
        }

        try {
            const orderItems = cartProducts.map((item) => ({
                id: item._id,
                name: item.name,
                price: Number(item.price),
                image: item.image,
                quantity: item.quantity,
            }));

            const orderData = {
                address: shipping,
                items: orderItems,
                amount: total + 2,
            };

            console.log("Sending order:", orderData);

            const res = await axios.post(`${url}/api/order/place`, orderData, {
                headers: {
                    token,
                },
            });

            if (res.data.success) {
                const { session_url } = res.data;

                if (session_url) {
                    window.location.replace(session_url);
                } else {
                    alert("تم إنشاء الطلب بنجاح ✅");
                    navigate("/");
                }
            } else {
                alert(res.data.message || "حدث خطأ أثناء إنشاء الطلب");
            }
        } catch (error) {
            console.error(
                "Order error:",
                error.response?.data || error.message,
            );

            alert(error.response?.data?.message || "حدث خطأ أثناء إرسال الطلب");
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/cart");
            return;
        }

        if (total === 0) {
            navigate("/cart");
        }
    }, [token, total, navigate]);

    return (
        <section className="relative w-full min-h-screen bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-24 px-6 sm:px-10">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none"></div>

            <div className="relative z-10 max-w-5xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center">
                    إتمام الطلب
                </h2>

                {cartProducts.length === 0 ? (
                    <div className="text-center text-gray-300 mt-20 space-y-6">
                        <p className="text-xl">السلة فارغة الآن 🛒</p>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="bg-linear-to-r from-cyan-500 to-blue-500 px-8 py-3 rounded-2xl font-semibold text-white hover:opacity-90 transition-all cursor-pointer"
                        >
                            العودة للتسوق
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Cart Products */}
                        <div className="space-y-6">
                            {cartProducts.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl shadow-lg border border-white/20"
                                >
                                    <img
                                        src={`${url}/images/${item.image}`}
                                        alt={item.name}
                                        className="w-20 h-20 object-contain rounded-xl"
                                    />

                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {item.name}
                                        </h3>

                                        <p className="text-sm text-gray-300">
                                            الكمية: {item.quantity}
                                        </p>

                                        <p className="text-cyan-400 font-bold">
                                            $
                                            {Number(item.price || 0).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-8 rounded-3xl bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 p-6 shadow-xl">
                                <p className="text-gray-300 text-sm uppercase">
                                    المجموع الكلي
                                </p>

                                <h2 className="text-4xl font-extrabold text-cyan-400 mt-2">
                                    ${Number(total).toFixed(2)}
                                </h2>

                                <p className="text-gray-300 mt-2">
                                    الشحن: $2.00
                                </p>

                                <p className="text-white font-bold text-xl mt-2">
                                    الإجمالي بعد الشحن: $
                                    {Number(total + 2).toFixed(2)}
                                </p>
                            </div>
                        </div>

                        {/* Shipping Form */}
                        <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/20 shadow-xl">
                            <h3 className="text-2xl font-semibold mb-6 text-center">
                                بيانات الشحن
                            </h3>

                            <form onSubmit={placeOrder} className="space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="الإسم بالكامل"
                                    value={shipping.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
                                />

                                <input
                                    type="text"
                                    name="address"
                                    placeholder="العنوان بالكامل"
                                    value={shipping.address}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
                                />

                                <input
                                    type="text"
                                    name="city"
                                    placeholder="المدينة"
                                    value={shipping.city}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
                                />

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="رقم الهاتف"
                                    value={shipping.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
                                />

                                <button
                                    type="submit"
                                    className="w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all mt-4 cursor-pointer"
                                >
                                    تأكيد الطلب 🚀
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Order;
