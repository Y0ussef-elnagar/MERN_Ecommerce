import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import axios from "axios";

const Verify = () => {
    const [searchParams] = useSearchParams();
    const verificationStarted = useRef(false);
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const storedToken = localStorage.getItem("token");

    const { url, clearCart, token } = useContext(ShopContext);

    const navigate = useNavigate();

    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const currentToken = token || storedToken;

        if (!currentToken || verificationStarted.current) {
            return;
        }

        verificationStarted.current = true;

        const verifyPayment = async () => {
            try {
                console.log("Verifying order:", orderId);
                console.log("Payment success:", success);

                const res = await axios.post(
                    `${url}/api/order/verify`,
                    {
                        success,
                        orderId,
                    },
                    {
                        headers: {
                            token: currentToken,
                        },
                    },
                );

                console.log("Verify response:", res.data);

                if (res.data.success) {
                    await clearCart();

                    setStatus("success");

                    setTimeout(() => {
                        navigate("/myorders");
                    }, 2000);
                } else {
                    setStatus("error");

                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                }
            } catch (error) {
                console.error(
                    "Payment verification error:",
                    error.response?.data || error.message,
                );

                setStatus("error");

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        };

        verifyPayment();
    }, [success, orderId, url, navigate, token, storedToken]);

    return (
        <section className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white px-6">
            <div className="text-center flex flex-col items-center">
                {status === "loading" && (
                    <div className="flex flex-col items-center animate-pulse">
                        <Loader2 className="w-20 h-20 animate-spin text-cyan-400 mb-6" />

                        <h2 className="text-2xl font-semibold">
                            جاري التحقق من عملية الدفع...
                        </h2>

                        <p className="text-gray-300 mt-2">
                            يرجى الانتظار قليلاً ⏳
                        </p>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex flex-col items-center animate-pulse">
                        <CheckCircle className="w-20 h-20 text-cyan-400 mb-6" />

                        <h2 className="text-3xl font-bold">
                            تم الدفع بنجاح 🎉
                        </h2>

                        <p className="text-gray-300 mt-2">
                            سيتم تحويلك إلى طلباتك...
                        </p>
                    </div>
                )}

                {status === "error" && (
                    <div className="flex flex-col items-center animate-pulse">
                        <XCircle className="w-20 h-20 text-red-400 mb-6" />

                        <h2 className="text-3xl font-bold">
                            فشلت عملية الدفع 😥
                        </h2>

                        <p className="text-gray-300 mt-2">
                            حدث خطأ أثناء التحقق من عملية الدفع...
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Verify;
