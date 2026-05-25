import axios from "axios";

const API_URL_SENTIMENT =
  "https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment";

const API_URL_EMOTION =
  "https://router.huggingface.co/hf-inference/models/j-hartmann/emotion-english-distilroberta-base";

// 🔹 SENTIMENT
export const getSentiment = async (text) => {
  try {
    const res = await axios.post(
      API_URL_SENTIMENT,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("🔥 HF Sentiment RAW:", res.data);

    const result = res.data[0];

    // 🔹 Find highest score
    const best = result.reduce((a, b) =>
      a.score > b.score ? a : b
    );

    // 🔹 Convert LABEL → readable text
    const labelMap = {
      LABEL_0: "Negative",
      LABEL_1: "Neutral",
      LABEL_2: "Positive",
    };

    return {
      label: labelMap[best.label] || best.label,
      score: best.score,
    };
  } catch (error) {
    console.log(
      "❌ Sentiment Error:",
      error.response?.data || error.message
    );
    return null;
  }
};

// 🔹 EMOTION
export const getEmotion = async (text) => {
  try {
    const res = await axios.post(
      API_URL_EMOTION,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("🔥 HF Emotion RAW:", res.data);

    const emotions = res.data[0];

    // 🔹 Sort emotions (highest first)
    const sorted = emotions.sort((a, b) => b.score - a.score);

    return {
      all: sorted,
      top: sorted[0], // 🔥 top emotion (useful)
    };
  } catch (error) {
    console.log(
      "❌ Emotion Error:",
      error.response?.data || error.message
    );
    return null;
  }
};