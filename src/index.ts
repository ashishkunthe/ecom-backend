import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.route";
import productRoutes from "./routes/product.route";
import cartRoutes from "./routes/cart.route";
import discountRoutes from "./routes/discount.route";
import adminRoutes from "./routes/admin.route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "server is alive" });
});

app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/discount", discountRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT;

app.listen(PORT || 5000, () => {
  console.log("sever is running", PORT);
});

export default app;
