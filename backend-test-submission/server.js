// server.js
const express = require("express");
const bodyParser = require("body-parser");
const { Log } = require("../logging-middleware/logger");

const app = express();
app.use(bodyParser.json());

app.post("/calculate-avg", async (req, res) => {
  const { numbers } = req.body;

  if (!Array.isArray(numbers)) {
    await Log("backend", "error", "handler", "Input is not an array");
    return res.status(400).json({ error: "Input must be an array" });
  }

  const average =
    numbers.reduce((sum, num) => sum + Number(num), 0) / numbers.length;

  await Log("backend", "info", "handler", "Average calculated successfully");

  res.json({ average });
});

app.listen(3001, () => {
  console.log("🚀 Server running at http://localhost:3001");
});
