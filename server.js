const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

// =========================
// בדיקת API KEY (חשוב!)
// =========================
console.log("API KEY קיים?", !!process.env.OPENAI_API_KEY);

// =========================
// OpenAI setup
// =========================
let openai = null;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// =========================
// בדיקת חיים
// =========================
app.get("/", (req, res) => {
  res.send("AI Server עובד!");
});

// =========================
// VOICE GET (בדיקה בדפדפן)
// =========================
app.get("/voice", (req, res) => {
  res.send("voice עובד (GET)");
});

// =========================
// פונקציית AI
// =========================
async function getAIResponse(text) {
  if (!openai) {
    return "GPT לא מחובר כרגע. קיבלתי: " + text;
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "ענה קצר וברור בעברית כמו דיבור אנושי." },
      { role: "user", content: text }
    ]
  });

  return response.choices[0].message.content;
}

// =========================
// VOICE POST (העיקרי)
// =========================
app.post("/voice", async (req, res) => {
  try {
    const text = req.body.text || "";

    const reply = await getAIResponse(text);

    res.json({ reply });

  } catch (err) {
    console.error(err);

    res.json({
      reply: "שגיאה בשרת"
    });
  }
});

// =========================
// הפעלת שרת
// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
