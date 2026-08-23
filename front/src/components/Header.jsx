import { Menu, Rocket, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import MenuItems from "./MenuItems";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) {
                setSideBarOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <header className="hidden h-12 md:flex items-center px-10 py-10 w-full fixed top-0 left-0 bg-linear-to-r from-indigo-800 via-purple-800 to-pink-800 backdrop-blur-md shadow-xl z-50">
                <div className="items-center gap-4 lg:flex hidden">
                    <Rocket
                        onClick={() => navigate("/")}
                        className="w-8 h-8 text-cyan-400 animate-pulse"
                    />
                    <h1
                        onClick={() => navigate("/")}
                        className="text-white font-bold text-xl tracking-widest"
                    >
                        Elnagar-Shop
                    </h1>
                </div>

                <div className="flex-1 flex justify-center lg:justify-items-end">
                    <MenuItems isMobile={false} />
                </div>
            </header>

            <header className="md:hidden h-12 flex justify-between items-center px-4 py-4 w-full fixed top-0 left-0 bg-linear-to-r from-indigo-800 via-purple-800 to-pink-800 backdrop:blur-md shadow-xl z-50">
                <div className="flex items-center gap-2">
                    <Rocket className="w-8 h-8 text-cyan-400 animate-pulse" />
                    <h1 className="text-white font-bold text-xl tracking-widest">
                        Elnagar-Shop
                    </h1>
                </div>
                <button
                    onClick={() => setSideBarOpen(true)}
                    className="text-white p-2 rounded-lg shadow-lg  hover:scale-105 transition-transform"
                >
                    <Menu className="w-8 h-8 cursor-pointer " />
                </button>
            </header>

            {/* Sidebar mobile */}
            <aside
                className={`fixed top-12 right-0 h-full w-72  bg-linear-to-b from-indigo-900 via-purple-900 to-pink-900  shadow-2xl backdrop-blur-md transform  transition-transform  duration-500 z-40 ${sideBarOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex justify-end p-4">
                    <button
                        onClick={() => setSideBarOpen(false)}
                        className="text-white p-3 hover:bg-white/20 rounded-lg transition-all duration-300"
                    >
                        <X className="w-7 h-7 " />
                    </button>
                </div>
                <div className="mt-10 px-6 space-y-6">
                    <MenuItems
                        setSideBarOpen={setSideBarOpen}
                        isMobile={true}
                    />
                </div>
            </aside>

            {sideBarOpen && (
                <div
                    className="sm:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 "
                    onClick={() => setSideBarOpen(false)}
                ></div>
            )}
        </>
    );
};

export default Header;
