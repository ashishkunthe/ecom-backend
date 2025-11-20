import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "server is alive" });
});

app.use("/auth", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT || 5000, () => {
  console.log("sever is running", PORT);
});
