import multer from "multer";
const upload = multer().single("image");
import productModel from "../models/productModel.js";
import db from '../models/connect.js'

export const getProduct = async (req, res) => {
  try {
    const productModels = await productModel.findAll();
    res.status(200).json(productModels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createProduct = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // Xử lý lỗi từ Multer
        return res.status(400).json({ message: "Multer error" });
      } else if (err) {
        // Xử lý lỗi khác
        return res.status(500).json({ message: "Unknown error" });
      }

      // Nếu không có lỗi từ Multer, tiếp tục xử lý
      const { name, price, sale_price, status, description } = req.body;
      const image = req.file.buffer;

      try {
        const newProduct = await productModel.create({
          name,
          price,
          sale_price,
          image,
          status,
          description,
          createdAt: new Date().toISOString(),
        });

        res.status(201).json(newProduct);
      } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, sale_price, status, description } = req.body;
    const image = req.file ? req.file.buffer : null;

    const updateValues = {
      name,
      price,
      sale_price,
      image,
      status,
      description,
    };

    // Thực hiện truy vấn SQL sử dụng Sequelize
    const [updatedRowCount, updatedProduct] = await productModel.update(updateValues, {
      where: {
        id
      },
      returning: true, // Trả về bản ghi đã được cập nhật
    });

    if (updatedRowCount > 0) {
      // Trả về thông tin sản phẩm đã được cập nhật
      res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};