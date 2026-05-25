import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  totalMessages: Number,
  mostActiveUser: String,
  userCount: Object,
  summary: String,
  sentiment: Object,
  emotion: Object,
  wordCount: Object,
  dayCount: Object,
  monthCount: Object,
}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);