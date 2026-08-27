import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error" });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "please Enter a vaild email",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-password");
        res.json({ success: true, data: users });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "error",
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete user",
        });
    }
};

export const makeAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            { role: "admin" },
            { new: true },
        );
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.json({
            success: true,
            message: "User is now an admin",
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to make user admin",
        });
    }
};

export const demoteToUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (!user)
            return res
                .status(404)
                .json({ success: false, message: "user not found" });

        if (user.role !== "admin") {
            return res
                .status(400)
                .json({ success: false, message: "User is not an admin" });
        }
        user.role = "user";
        await user.save();
        res.json({
            success: true,
            message: "User is now a normal user",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to remove admin privileges",
        });
    }
};

export { loginUser, registerUser };
