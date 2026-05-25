import express from "express";
import multer from "multer";
import { uploadChat } from "../controllers/chatController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadChat);

export default router;