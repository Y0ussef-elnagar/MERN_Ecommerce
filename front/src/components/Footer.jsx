import { Mail, MapPin, Phone } from "lucide-react";
import React, { useState } from "react";

const Footer = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`${formData.name}, شكرا لتواصلك معنا`);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section className="relative w-full min-h-screen bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-24 px-6 sm:px-10">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none"></div>
            <div className="relative z-10 max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-center">
                    تواصل معنا
                </h2>
                <p className="text-gray-300 mb-12 text-lg sm:text-xl text-center">
                    نحن هنا لمساعدتك في أي وقت. أرسل لنا رسالة وسنعود إليك
                    قريبًا!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg hover:shadow-cyan-400/30 transition-all">
                            <MapPin className="w-8 h-8 text-cyan-400" />

                            <div>
                                <h4 className="font-semibold text-lg">
                                    العنوان
                                </h4>
                                <p className="text-gray-300">
                                    123 شارع التخيل، مدينة المستقبل
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg hover:shadow-cyan-400/30 transition-all">
                            <Phone className="w-8 h-8 text-cyan-400" />

                            <div>
                                <h4 className="font-semibold text-lg">
                                    الهاتف
                                </h4>
                                <p className="text-gray-300">+123 456 7890</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg hover:shadow-cyan-400/30 transition-all">
                            <Mail className="w-8 h-8 text-cyan-400" />
                            <div>
                                <h4 className="font-semibold text-lg">
                                    البريد الإلكتروني
                                </h4>
                                <p className="text-gray-300">
                                    support@ecommerce.com
                                </p>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl flex flex-col gap-6"
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="اسمك"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="bg-white/15 p-4 rounded-xl text-white  placeholder-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="البريد الإلكتروني"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="bg-white/15 p-4 rounded-xl text-white  placeholder-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                        />
                        <textarea
                            name="message"
                            placeholder="رسالتك"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full bg-white/15 px-4 py-3 rounded-xl text-white  placeholder-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400  resize-none"
                        />
                        <button
                            type="submit"
                            className="bg-linear-to-r from-indigo-500 via-purple-600 to-pink-500 px-6 py-3 font-semibold rounded-2xl text-white hover:opacity-90 transition-all shadow-lg cursor-pointer"
                        >
                            إرسال الرسالة
                        </button>
                    </form>
                </div>
            </div>
            <footer className="mt-24 relative z-10 max-w-7xl mx-auto text-center text-gray-300">
                <p className="mb-4">© 2026 E-Commerce. جميع الحقوق محفوظة.</p>
                <div className="flex justify-center gap-6">
                    <a href="#" className="hover:text-white transition-colors">
                        Facebook
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        Twitter
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        Instagram
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        WhatsApp
                    </a>
                </div>
            </footer>
        </section>
    );
};

export default Footer;
