const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

// =========================
// בדיקת חיים
// =========================
app.get("/", (req, res) => {
  res.send("AI Server עובד!");
});

// =========================
// OpenAI setup (בטוח)
// =========================
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// =========================
// פונקציית AI
// =========================
async function getAIResponse(text) {
  if (!openai) {
    return "GPT לא מחובר כרגע. קיבלתי: " + text;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "ענה קצר וברור בעברית כמו בן אדם." },
        { role: "user", content: text }
      ]
    });

    return response.choices[0].message.content;

  } catch (err) {
    console.error(err);
    return "שגיאה מול GPT";
  }
}

// =========================
// VOICE (GET בדיקה)
// =========================
app.get("/voice", (req, res) => {
  res.send("voice עובד (GET)");
});

// =========================
// VOICE (POST אמיתי)
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
