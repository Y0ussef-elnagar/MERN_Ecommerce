import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { id: itemId } = req.body;
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res
                .status(404)
                .json({ success: false, message: "User Not Found" });
        }
        let cartData = userData.cartData || {};
        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added TO Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { id: itemId } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res
                .status(404)
                .json({ success: false, message: "User Not Found" });
        }

        if (itemId) {
            if (userData.cartData[itemId]) {
                userData.cartData[itemId] -= 1;
                if (userData.cartData[itemId] <= 0)
                    delete userData.cartData[itemId];
            }
        } else {
            userData.cartData = {};
        }
        await userData.save();
        res.status(200).json({
            success: true,
            message: itemId
                ? "Item removed from cart"
                : "Cart cleared successfully",
            cartData: userData.cartData,
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getCart = async (req, res) => {
    try {
        const userId = req.userId;
        let userData = await userModel.findById(userId);

        if (!userData) {
            return res
                .status(404)
                .json({ success: false, message: "User Not Found" });
        }
        res.json({ success: true, cartData: userData.cartData || {} });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId);

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User Not Found" });
        }
        const cartData = user.cartData || {};
        user.cartData = {};
        await user.save();
        res.json({
            success: true,
            message: "Cart fetched and cleared successfully",
            cartData,
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, removeFromCart, getCart, clearCart };
