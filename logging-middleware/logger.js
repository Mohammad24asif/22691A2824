// logger.js
const axios = require("axios");

// 🔐 Use your actual access token here (keep it secret!)
const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjY5MWEyODI0QG1pdHMuYWMuaW4iLCJleHAiOjE3NTIyMTgzMjIsImlhdCI6MTc1MjIxNzQyMiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6Ijk2MThjNWNiLTkwYzItNGQ3My04NjY2LTQ3ZjkwYzFkMTMxZCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNoYWlrIG1vaGFtbWFkIGFzaWYiLCJzdWIiOiJlZWJlMWIyZC00ZTE5LTRkMjktYjRmYS1iZDljMTRlM2QzMTQifSwiZW1haWwiOiIyMjY5MWEyODI0QG1pdHMuYWMuaW4iLCJuYW1lIjoic2hhaWsgbW9oYW1tYWQgYXNpZiIsInJvbGxObyI6IjIyNjkxYTI4MjQiLCJhY2Nlc3NDb2RlIjoiY2FWdk5IIiwiY2xpZW50SUQiOiJlZWJlMWIyZC00ZTE5LTRkMjktYjRmYS1iZDljMTRlM2QzMTQiLCJjbGllbnRTZWNyZXQiOiJiZXVBWE1CanFSTkZBVEtSIn0.VrAR9ZcdLEGkUrUS4I-KISndZkDJRfh4GakPbIEUtzo";
 // 🔒 Paste full JWT token

const Log = async (stack, level, pkg, message) => {
  try {
    const res = await axios.post(
      "http://20.244.56.144/evaluation-service/logs", // ✅ Correct API endpoint
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ Log sent:", res.data);
  } catch (err) {
    console.error("❌ Logging failed:", err.message);
  }
};

module.exports = { Log };
