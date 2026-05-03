const express = require("express");
const app = express();

app.use(express.json());

// =========================
// בדיקת חיים
// =========================
app.get("/", (req, res) => {
  res.send("AI Server עובד!");
});

// =========================
// פונקציית AI (חינמית fallback)
// =========================
async function getAIResponse(text) {
  // אם בעתיד תוסיף GPT – זה המקום

  if (process.env.OPENAI_API_KEY) {
    const OpenAI = require("openai");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "אתה עוזר קולי קצר בעברית." },
        { role: "user", content: text }
      ]
    });

    return response.choices[0].message.content;
  }

  // 🔵 מצב חינמי (בלי GPT)
  return "קיבלתי את השאלה שלך: " + text;
}

// =========================
// VOICE endpoint (לקו הטלפון)
// =========================
app.post("/voice", async (req, res) => {
  try {
    const text = req.body.text || "";

    const reply = await getAIResponse(text);

    res.json({
      reply: reply
    });

  } catch (err) {
    console.error(err);

    res.json({
      reply: "יש בעיה בשרת כרגע"
    });
  }
});

// =========================
// הפעלה
// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("AI Server running on port " + PORT);
});
