import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Shield, Trash2, Users2 } from "lucide-react";

const Users = () => {
    const url = "http://localhost:4000";
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const demoteToUser = async (id) => {
        try {
            await axios.put(`${url}/api/user/demote/${id}`);
            setUsers((prev) =>
                prev.map((u) => (u._id === id ? { ...u, role: "user" } : u)),
            );
            alert("Now he is user");
        } catch (error) {
            console.error(
                "Failed to demote user:",
                error.response?.data || error.message,
            );
            alert("Error");
        }
    };

    const promoteToAdmin = async (id) => {
        try {
            await axios.put(`${url}/api/user/make-admin/${id}`);
            setUsers((prev) =>
                prev.map((u) => (u._id === id ? { ...u, role: "admin" } : u)),
            );
            alert("Now he is admin");
        } catch (error) {
            console.error(
                "Failed to demote user:",
                error.response?.data || error.message,
            );
            alert("Error");
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${url}/api/user/list`);
            if (res.data && res.data.success) {
                setUsers(res.data.data || []);
            } else {
                setUsers([]);
            }
        } catch (error) {
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure to delete this user?")) return;
        try {
            const res = await axios.delete(`${url}/api/user/delete/${id}`);
            if (res.data && res.data.success) {
                setUsers((prev) => prev.filter((u) => u._id !== id));
                alert("user deleted successfully✅");
            } else {
                alert("failed to delete , check server");
            }
        } catch (error) {
            console.error(
                "Failed to delete user:",
                error.response?.data || error.message,
            );
            alert("Error");
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <section
            className="md:ml-64 min-h-screen bg-linear-to-r from-indigo-900  via-purple-900 to-pink-900
         text-white py-24 px-6 sm:px-10"
        >
            <div className=" max-w-6xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center flex items-center justify-center gap-3">
                    إدارة المستخدمين
                    <Users2 className="w-10 h-10 text-white" />
                </h2>
                {loading ? (
                    <div className="text-center text-gray-300 text-lg"></div>
                ) : users.length === 0 ? (
                    <div className="text-center text-gray-400 text-lg"></div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                        {users.map((user) => (
                            <div
                                key={user._id}
                                className="bg-white/10 border border-white/20 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center shadow-lg hover:shadow-indigo-500/40 transition-all"
                            >
                                <div className="w-20 h-20 rounded-full bg-linear-to-r from-indigo-900  via-purple-900 to-pink-900 flex items-center justify-center mb-4 overflow-hidden ">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            className="w-20 h-20 rounded-full object-cover "
                                        />
                                    ) : (
                                        <User className="w-10 h-10 text-white" />
                                    )}
                                </div>
                                <h3 className="text-xl font-bold">
                                    {user.name}
                                </h3>
                                <p className="text-gray-300 text-sm mb-3 ">
                                    {user.email}
                                </p>
                                <div
                                    className={`px-3 py-1 rounded-full text-sm font-semibold mb-4
                                         ${
                                             user.role === "admin"
                                                 ? "bg-yellow-400/80 text-black flex items-center gap-1 "
                                                 : "bg-cyan-500/80 text-white"
                                         }`}
                                >
                                    {user.role === "admin" && (
                                        <Shield className="w-4 h-4" />
                                    )}
                                    {user.role === "admin" ? "مدير" : "مستخدم"}
                                </div>
                                <button
                                    onClick={() => deleteUser(user._id)}
                                    disabled={user.role !== "user"}
                                    className={`flex items-center gap-2 px-4 py-2 mb-2 rounded-lg font-semibold transition-all
                                        ${
                                            user.role === "admin"
                                                ? "bg-gray-500/40 cursor-not-allowed"
                                                : "bg-red-500 hover:bg-red-600"
                                        }`}
                                >
                                    <Trash2 className="w-5 h-5" />
                                    حذف المستخدم
                                </button>

                                <button
                                    onClick={() => promoteToAdmin(user._id)}
                                    disabled={user.role === "admin"}
                                    className={`flex items-center gap-2 px-4 py-2 mb-2 rounded-lg font-semibold transition-all
                                        ${
                                            user.role === "admin"
                                                ? "bg-gray-500/40 cursor-not-allowed"
                                                : "bg-yellow-500 hover:bg-yellow-600"
                                        }`}
                                >
                                    <Shield className="w-5 h-5" />
                                    {user.role === "admin"
                                        ? "مدير"
                                        : "ترقيه الى ادمين"}
                                </button>

                                <button
                                    onClick={() => demoteToUser(user._id)}
                                    disabled={user.role !== "admin"}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all
                                        ${
                                            user.role !== "admin"
                                                ? "bg-gray-500/40 cursor-not-allowed"
                                                : "bg-indigo-500 hover:bg-indigo-600"
                                        }`}
                                >
                                    <User className="w-5 h-5" />
                                    إعاده الى مستخدم
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Users;
