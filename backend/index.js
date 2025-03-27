import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import messageRoutes from "./routes/messageRoutes.js";
import qrRoutes from "./routes/qrRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/messages", messageRoutes);
app.use("/api/qr", qrRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor.`));
