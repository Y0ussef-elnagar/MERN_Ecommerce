import React from "react";
import heroImage from "../assets/bg.png";
import { ShoppingCart } from "lucide-react";

const Hero = () => {
    return (
        <div>
            <section className="relative w-full min-h-screen bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white flex items-center">
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 flex flex-col-reverse md:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8 ">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
                            اكتشف احدث المنتجات <br />! مع افضل التخفيضات
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-xl">
                            تسوّق الآن واستمتع بعروض لا تُفوَّت على
                            الإلكترونيات، والأزياء، والمنتجات المميزة. احصل على
                            خصومات تصل إلى %50 لفترة محدودة.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6 mt-6 ">
                            <button
                                onClick={() => (window.location.href = "/shop")}
                                className="flex items-center gap-3 bg-cyan-400 hover:bg-cyan-500 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                تسوّق الآن
                            </button>

                            <button
                                onClick={() =>
                                    (window.location.href = "/categories")
                                }
                                className="flex items-center gap-3 bg-white/10 border border-white/30 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
                            >
                                تصفح الفئات
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 relative w-full max-w-lg">
                        <img
                            src={heroImage}
                            className="w-full h-full object-cover rounded-3xl shadow-2xl"
                        />
                        <div className="absolute top-6 left-6 bg-red-500 text-white px-5 py-3 rounded-full font-bold shadow-lg animate-pulse text-lg">
                            خصم حتى %50
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 w-full overflow-hidden leading-none rotate-180">
                    <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="w-full h-32"
                    >
                        <path
                            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                            className="fill-white"
                        />
                    </svg>
                </div>
            </section>
        </div>
    );
};

export default Hero;
