import { createContext, useState, useEffect } from "react";
import { all_products } from "../assets/data";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [products, setProducts] = useState([]);

    const url = "http://localhost:4000";

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem("cartItems");

        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.log("Invalid cart data:", error);
                setCartItems({});
            }
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // Add product to cart
    const addToCart = async (id, quantity = 1) => {
        setCartItems((prev) => ({
            ...prev,
            [id]: prev[id] ? prev[id] + quantity : quantity,
        }));

        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/add`,
                    { id },
                    { headers: { token } },
                );
            } catch (error) {
                console.log("Add to cart error:", error);
            }
        }
    };

    // Remove one product from cart
    const removeFromCart = async (id, removeAll = false) => {
        setCartItems((prev) => {
            const updated = { ...prev };

            if (removeAll || updated[id] === 1) {
                delete updated[id];
            } else if (updated[id] > 1) {
                updated[id]--;
            }

            return updated;
        });

        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/remove`,
                    { id },
                    { headers: { token } },
                );
            } catch (error) {
                console.log("Remove from cart error:", error);
            }
        }
    };

    // Clear entire cart
    const clearCart = async () => {
        setCartItems({});

        if (!token) return;

        try {
            await axios.post(
                `${url}/api/cart/clear`,
                {},
                { headers: { token } },
            );
        } catch (error) {
            console.log("Clear cart error:", error);
        }
    };

    // Get total cart amount
    const getTotalCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [id, qty]) => {
            const product = products.find((p) => String(p._id) === String(id));

            return total + (product ? Number(product.price) * qty : 0);
        }, 0);
    };

    // Fetch products
    const fetchProductsList = async () => {
        try {
            const res = await axios.get(`${url}/api/product/list`);

            setProducts(res.data.data || []);
        } catch (error) {
            console.log("Products fetch error:", error);

            setProducts(all_products);
        }
    };

    // Load cart from database
    const loadCartData = async (userToken) => {
        try {
            const res = await axios.post(
                `${url}/api/cart/get`,
                {},
                {
                    headers: {
                        token: userToken,
                    },
                },
            );

            if (res.data.success) {
                setCartItems(res.data.cartData || {});
            }
        } catch (error) {
            console.log("Load cart error:", error);
        }
    };

    // Initial data loading
    useEffect(() => {
        const loadData = async () => {
            await fetchProductsList();

            const savedToken = localStorage.getItem("token");

            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
            }
        };

        loadData();
    }, []);

    const value = {
        all_products: products,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        url,
        clearCart,
        setCartItems,
        setToken,
    };

    return (
        <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
    );
};

export default ShopContextProvider;
