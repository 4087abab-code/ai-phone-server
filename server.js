const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// =========================
// בדיקת חיים
// =========================
app.get("/", (req, res) => {
  res.send("AI Server עובד!");
});

// =========================
// פונקציית AI
// =========================
async function getAIResponse(text) {
  if (!process.env.OPENAI_API_KEY) {
    return "GPT לא מחובר כרגע. קיבלתי: " + text;
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "ענה קצר וברור בעברית כמו בן אדם." },
          { role: "user", content: text }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.OPENAI_API_KEY
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (err) {
    console.error(err.response?.data || err.message);
    return "שגיאה מול GPT";
  }
}

// =========================
// VOICE GET
// =========================
app.get("/voice", (req, res) => {
  res.send("voice עובד (GET)");
});

// =========================
// VOICE POST
// =========================
app.post("/voice", async (req, res) => {
  const text = req.body.text || "";

  const reply = await getAIResponse(text);

  res.json({ reply });
});

// =========================
// הפעלה
// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
