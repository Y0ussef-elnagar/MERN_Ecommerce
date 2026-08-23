import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const SignUp = () => {
    const navigate = useNavigate();

    const { url, setToken } = useContext(ShopContext);
    const [state, setState] = useState("register");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onSignUp = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("كلمة المرور غير متطابقة");
            return;
        }

        let newUrl = url;
        if (state === "login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }
        try {
            const res = await axios.post(newUrl, formData);
            if (res.data.success) {
                setToken(res.data.token);
                localStorage.setItem("token", res.data.token);
                navigate("/");
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <section
            className=" relative min-h-screen w-full bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white 
      py-24 px-6 sm:px-10 flex items-center justify-center"
        >
            <div className=" absolute inset-0 bg-black/30 backdrop-blur-sm p-10 pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-6">
                    إنشاء حساب جديد
                </h2>

                <form onSubmit={onSignUp} className="flex flex-col gap-6">
                    <input
                        type="text"
                        name="name"
                        placeholder="الإسم بالكامل"
                        value={formData.name}
                        required
                        className=" bg-white/15 px-4 py-3  rounded-xl text-white placeholder-gray-300 font-semibold focus:ring-2 focus:outline-none focus:ring-cyan-400 transition-all"
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="البريد الإلكتروني"
                        value={formData.email}
                        required
                        className=" bg-white/15 px-4 py-3  rounded-xl text-white placeholder-gray-300 font-semibold focus:ring-2 focus:outline-none focus:ring-cyan-400 transition-all"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="كلمة المرور"
                        value={formData.password}
                        required
                        className=" bg-white/15 px-4 py-3  rounded-xl text-white placeholder-gray-300 font-semibold focus:ring-2 focus:outline-none focus:ring-cyan-400 transition-all"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="تأكيد كلمة المرور"
                        value={formData.confirmPassword}
                        required
                        className=" bg-white/15 px-4 py-3  rounded-xl text-white placeholder-gray-300 font-semibold focus:ring-2 focus:outline-none focus:ring-cyan-400 transition-all"
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="bg-linear-to-r from-cyan-400 to-blue-500 px-6 py-3 rounded-2xl font-semibold text-white hover:opacity-90 transition-all shadow-lg"
                    >
                        إنشاء حساب
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-300">
                    لديك حساب؟{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-cyan-400 font-semibold cursor-pointer hover:underline"
                    >
                        تسجيل دخول
                    </span>
                </p>
            </div>
        </section>
    );
};

export default SignUp;
