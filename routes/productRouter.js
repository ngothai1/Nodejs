import express from "express";
import { getProduct, createProduct,editProduct } from "../controllers/productController.js";
const router = express.Router();

router.get('/',getProduct);
router.post('/',createProduct);
router.patch('/:id',editProduct);

export default router