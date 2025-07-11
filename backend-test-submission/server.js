const express = require("express");
const bodyParser = require("body-parser");
const { Log, setAuthToken } = require("../logging-middleware/logger");
const axios = require("axios");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// 🧾 Auth before starting the server
const authPayload = {
    email: "ramkrishna@abc.edu",
    name: "Ram Krishna",
    rollNo: "aa1bb",
    accessCode: "xgAsNC",
    clientID: "d9cbb699-6a27-44a5-8d59-8b1befa816da",
    clientSecret: "tVJaaaRBSeXcRXeM"
};

axios.post("http://20.244.56.144/evaluation-service/auth", authPayload)
    .then(res => {
        const token = res.data.access_token;
        setAuthToken(token);
        Log("backend", "info", "auth", "Auth token received and set");

        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("❌ Auth failed", err.message);
    });

// ➗ Average Calculator Endpoint
app.post("/calculate-avg", (req, res) => {
    try {
        const { numbers } = req.body;

        if (!Array.isArray(numbers)) {
            Log("backend", "error", "handler", "Invalid input type, expected array");
            return res.status(400).json({ error: "Invalid input, expected 'numbers' as array" });
        }

        const sum = numbers.reduce((acc, num) => acc + num, 0);
        const avg = sum / numbers.length;

        Log("backend", "info", "controller", "Average calculated successfully");

        res.json({ average: avg });
    } catch (error) {
        Log("backend", "fatal", "handler", "Unhandled error: " + error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
