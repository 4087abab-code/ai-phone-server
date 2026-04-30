const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("השרת עובד!");
});

app.post("/voice", (req, res) => {
  const text = req.body.text || "לא נשלח טקסט";

  console.log("הגיע:", text);

  res.json({
    reply: "קיבלתי: " + text
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
