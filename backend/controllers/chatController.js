import fs from "fs";
import { parseChat } from "../utils/chatParser.js";
import { getSentiment, getEmotion } from "../services/huggingfaceService.js";
import Chat from "../models/Chat.js";

export const uploadChat = async (req, res) => {
  try {
    // 🔹 1. File validation
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded ❌" });
    }

    if (!req.file.mimetype.includes("text")) {
      return res.status(400).json({ error: "Only .txt files allowed ❌" });
    }

    // 🔹 2. Read file
    const fileContent = fs.readFileSync(req.file.path, "utf-8");

    console.log("📄 File Loaded");

    // 🔹 3. Parse chat
    let messages = [];

    try {
      messages = parseChat(fileContent);
    } catch (err) {
      console.log("❌ parseChat failed:", err.message);
    }

    // 🔥 FALLBACK PARSER
    if (!messages || messages.length === 0) {
      console.log("⚠️ Using fallback parser");

      const lines = fileContent.split("\n").filter(line => line.trim() !== "");

      messages = lines.map(line => {
        const parts = line.split(" - ");
        if (parts.length < 2) return null;

        const msgPart = parts[1];
        const user = msgPart.split(":")[0];
        const message = msgPart.split(":").slice(1).join(":");

        return { user, message };
      }).filter(Boolean);
    }

    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: "Invalid chat format ❌" });
    }

    console.log("✅ Parsed Messages:", messages.length);

    // 🔹 4. Total messages
    const totalMessages = messages.length;

    // 🔹 5. User count
    const userCount = {};
    messages.forEach((msg) => {
      if (!msg.user) return;
      userCount[msg.user] = (userCount[msg.user] || 0) + 1;
    });

    // 🔹 6. Most active user
    const mostActiveUser =
      Object.keys(userCount).length > 0
        ? Object.keys(userCount).reduce((a, b) =>
            userCount[a] > userCount[b] ? a : b
          )
        : "Unknown";

    // 🔹 7. Word frequency
    const wordCount = {};
    const ignoreWords = [
      "media","omitted","deleted","message","this","that",
      "have","with","from","your","there","their","about",
      "would","could"
    ];

    messages.forEach((msg) => {
      if (!msg.message) return;

      const words = msg.message
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .split(" ");

      words.forEach((word) => {
        if (word.length > 3 && !ignoreWords.includes(word)) {
          wordCount[word] = (wordCount[word] || 0) + 1;
        }
      });
    });

    // 🔥 NEW FEATURE: Emoji Count (REAL DATA)
    const emojiCount = {};

    messages.forEach((msg) => {
      if (!msg.message) return;

      const emojis = msg.message.match(/([\u231A-\uD83E\uDDFF])/gu);

      if (emojis) {
        emojis.forEach((emoji) => {
          emojiCount[emoji] = (emojiCount[emoji] || 0) + 1;
        });
      }
    });

    // 🔥 Activity Map
    const dayCount = {};
    const monthCount = {};

    messages.forEach((msg) => {
      if (!msg.date) return;

      const date = new Date(msg.date);

      const day = date.toLocaleString("en-US", { weekday: "long" });
      const month = date.toLocaleString("en-US", { month: "long" });

      dayCount[day] = (dayCount[day] || 0) + 1;
      monthCount[month] = (monthCount[month] || 0) + 1;
    });

    // 🔹 Summary
    const summary = `This WhatsApp chat contains ${totalMessages} messages. The most active user is ${mostActiveUser}.`;

    // 🔹 AI input
    const sampleText = messages
      .slice(0, 50)
      .map((m) => m.message)
      .join(" ")
      .slice(0, 1000);

    // 🔹 AI Analysis
    let sentiment = null;
    let emotion = null;

    try {
      sentiment = await getSentiment(sampleText);
    } catch (err) {
      console.log("Sentiment failed");
    }

    try {
      emotion = await getEmotion(sampleText);
    } catch (err) {
      console.log("Emotion failed");
    }

    if (!sentiment) sentiment = { label: "Neutral", score: 1 };
    if (!emotion) emotion = { all: [{ label: "joy", score: 1 }] };

    console.log("📊 FINAL DATA:", {
      totalMessages,
      mostActiveUser,
      userCount,
      dayCount,
      monthCount,
      emojiCount, // ✅ NEW
    });

    // 🔹 Save to DB
    await Chat.create({
      totalMessages,
      mostActiveUser,
      userCount,
      summary,
      sentiment,
      emotion,
      wordCount,
      dayCount,
      monthCount,
      emojiCount, // ✅ NEW
    });

    // 🔹 FINAL RESPONSE
    return res.status(200).json({
      success: true,
      data: {
        totalMessages,
        mostActiveUser,
        userCount,
        summary,
        sentiment,
        emotion,
        wordCount,

        // ✅ NEW DATA
        dayCount,
        monthCount,
        emojiCount,
      },
    });

  } catch (error) {
    console.error("🔥 Server Error:", error);

    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};