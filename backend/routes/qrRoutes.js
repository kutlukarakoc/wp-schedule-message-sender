import express from "express";
import { getQR } from "../controllers/qrController.js";

const router = express.Router();

router.get("/", getQR);

export default router;
