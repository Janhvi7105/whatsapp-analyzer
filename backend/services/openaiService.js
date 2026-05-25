import axios from "axios";

export const getSummary = async (text) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // ✅ stable model
        messages: [
          {
            role: "user",
            content: `Summarize this WhatsApp chat in short:\n${text}`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.log("🔥 OpenAI Error:", error.response?.data || error.message);
    return "Summary not available";
  }
};