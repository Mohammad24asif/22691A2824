const axios = require('axios');

let accessToken = null;

function setAuthToken(token) {
    accessToken = token;
}

async function Log(stack, level, pkg, message) {
    if (!accessToken) {
        console.log("Access token missing.");
        return;
    }

    try {
        const response = await axios.post(
            "http://20.244.56.144/evaluation-service/logs",
            {
                stack: stack,
                level: level,
                package: pkg,
                message: message
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );
        console.log("✅ Log sent:", response.data.message);
    } catch (err) {
        console.error("❌ Log error:", err.message);
    }
}

module.exports = { Log, setAuthToken };
