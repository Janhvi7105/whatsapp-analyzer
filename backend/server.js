import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import chatRoutes from "./routes/chatRoutes.js";
import connectDB from "./config/db.js";

// ✅ Load env variables
dotenv.config();

const app = express();

// 🔍 DEBUG LOGS
console.log("✅ Server starting...");
console.log(
  "📡 Mongo URI:",
  process.env.MONGO_URI ? "Loaded ✅" : "Missing ❌"
);
console.log(
  "🤖 HF TOKEN:",
  process.env.HUGGINGFACE_API_KEY ? "Loaded ✅" : "Missing ❌"
);

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ ROUTES
app.use("/api/chat", chatRoutes);

// ✅ HEALTH CHECK
app.get("/", (req, res) => {
  res.status(200).json({
    message: "WhatsApp Analyzer API Running 🚀",
  });
});

// ✅ GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err.stack);

  res.status(500).json({
    success: false,
    error: "Something went wrong",
  });
});

// ✅ PORT
const PORT = process.env.PORT || 5001;

// ✅ START SERVER AFTER DB CONNECTS
connectDB()
  .then(() => {
    console.log("🟢 Database connected, starting server...");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Failed:", err.message);
    process.exit(1);
  });