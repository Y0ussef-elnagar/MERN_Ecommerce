import express from "express";
import multer from "multer";

import {
    addProduct,
    listProducts,
    removeProducts,
} from "../controllers/productController.js";

const productRouter = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

productRouter.post("/add", upload.single("image"), addProduct);
productRouter.get("/list", listProducts);
productRouter.post("/remove", removeProducts);

export default productRouter;
