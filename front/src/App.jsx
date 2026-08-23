import React from "react";
import { Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Verify from "./pages/Verify";
import MyOrders from "./pages/MyOrders";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Header from "./components/Header";
import ShopContextProvider from "./context/ShopContext";

const App = () => {
    return (
        <ShopContextProvider>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<Order />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/login" element={<Login />} />
                <Route path="/myorders" element={<MyOrders />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </ShopContextProvider>
    );
};

export default App;
