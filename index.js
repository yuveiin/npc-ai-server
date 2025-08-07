const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("NPC AI Server is running!");
});

app.post("/chat", async (req, res) => {
  const question = req.body.question;

  if (!question) {
    return res.status(400).json({ error: "No question provided." });
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });

    res.json({
      response: chatCompletion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI HATASI:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server ready on port", PORT);
});
