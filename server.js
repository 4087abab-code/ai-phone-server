const express = require("express");
const app = express();

app.use(express.json());

/* =========================
   בדיקת חיים של השרת
========================= */
app.get("/", (req, res) => {
  res.send("השרת עובד!");
});

/* =========================
   VOICE - GET (לפינגים ודפדפן)
========================= */
app.get("/voice", (req, res) => {
  res.send("voice עובד (GET)");
});

/* =========================
   VOICE - POST (בשביל שליחה אמיתית)
========================= */
app.post("/voice", (req, res) => {
  const text = req.body.text || "לא נשלח טקסט";

  console.log("הגיע:", text);

  res.json({
    reply: "קיבלתי: " + text
  });
});

/* =========================
   הפעלת השרת
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
