import React from "react";

import Add from "./components/Add";
import List from "./components/List";
import Sidebar from "./components/Sidebar";
import Orders from "./components/Orders";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./components/AdminLogin";
import Users from "./components/Users";
import Notifications from "./components/Notifications";

import {
    Navigate,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

const App = () => {
    const location = useLocation();

    const isLoginPage = location.pathname === "/admin/login";

    return (
        <>
            <Toaster />

            {/* Sidebar يظهر في كل صفحات admin ماعدا login */}
            {!isLoginPage && <Sidebar />}

            <Routes>

                {/* "/" → "/admin" */}
                <Route
                    path="/"
                    element={<Navigate to="/admin" replace />}
                />

                {/* "/admin" → "/admin/login" */}
                <Route
                    path="/admin"
                    element={
                        <Navigate
                            to="/admin/login"
                            replace
                        />
                    }
                />

                {/* Login */}
                <Route
                    path="/admin/login"
                    element={<AdminLogin />}
                />

                {/* Add Product */}
                <Route
                    path="/admin/add"
                    element={
                        <ProtectedRoute>
                            <Add />
                        </ProtectedRoute>
                    }
                />

                {/* Products */}
                <Route
                    path="/admin/list"
                    element={
                        <ProtectedRoute>
                            <List />
                        </ProtectedRoute>
                    }
                />

                {/* Orders */}
                <Route
                    path="/admin/orders"
                    element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>
                    }
                />

                {/* Users */}
                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute>
                            <Users />
                        </ProtectedRoute>
                    }
                />

                {/* Notifications */}
                <Route
                    path="/admin/notifications"
                    element={
                        <ProtectedRoute>
                            <Notifications />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </>
    );
};

export default App;