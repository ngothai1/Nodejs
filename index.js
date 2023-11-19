import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from "./routes/productRouter.js";


const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb",extended: true })); // bodyParser: sử dụng middleware extended: sẽ cho phép dữ liệu JSON có cấu trúc phức tạp
app.use(bodyParser.urlencoded({ limit: "30mb",extended: true }));// làm cho việc xử lý dữ liệu biểu mẫu HTML trong ứng dụng Node.js trở nên dễ dàng và tiện lợi
app.use(cors());//dữ liệu JSON hoặc hình ảnh

app.use("/posts", postRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
