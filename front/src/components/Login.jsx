import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();

    const [state, setState] = useState("register");
    const { url, setToken } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((data) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    };

    const onLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${url}/api/user/login`, formData);

            if (res.data.success) {
                setToken(res.data.token);
                localStorage.setItem("token", res.data.token);
                navigate("/");
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };
    return (
        <section
            className=" relative min-h-screen w-full bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white 
      py-24 px-6 sm:px-10 flex items-center justify-center"
        >
            <div className=" absolute inset-0 bg-black/30 backdrop-blur-sm p-10 pointer-events-none"></div>
            <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 shadow-2xl">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-6">
                    تسجيل الدخول
                </h2>

                <form onSubmit={onLogin} className="flex flex-col gap-6">
                    <input
                        type="email"
                        name="email"
                        placeholder="البريد الإلكتروني"
                        value={formData.email}
                        required
                        className=" bg-white/30 p-4 rounded-xl text-white placeholder-gray-300 font-semibold focus:ring-2 focus:outline-none focus:ring-cyan-400 transition-all"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="كلمة المرور"
                        value={formData.password}
                        required
                        className=" bg-white/30 p-4 rounded-xl text-white placeholder-gray-300 font-semibold focus:ring-2 focus:outline-none focus:ring-cyan-400 transition-all"
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="bg-linear-to-r from-indigo-400 via-purple-600 to-pink-500 px-6 py-3 rounded-2xl font-semibold text-white hover:opacity-90 transition-all shadow-lg cursor-pointer"
                    >
                        تسجيل الدخول
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-300">
                    ليس لديك حساب؟{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-cyan-400 font-semibold cursor-pointer hover:underline"
                    >
                        إنشاء حساب جديد
                    </span>
                </p>
            </div>
        </section>
    );
};

export default Login;
