const express = require("express");
const admin = require("./firebaseAdmin");
const schedule = require("node-schedule");
require('dotenv').config();
const app = express();
app.use(express.json());

app.post("/schedule-notification", async (req, res) => {
  const { token, title, body, time } = req.body;
console.log(time);
  if (!token || !title || !body || !time) {
    return res.status(400).send("Token, title, body, and time are required");
  }
console.log(time);
  console.log("Scheduling notification at:", time);

  // Parse the time (expected in ISO format)
  const scheduledTime = new Date(time);

  if (isNaN(scheduledTime)) {
    return res.status(400).send("Invalid time format. Use ISO format (e.g., 2025-01-12T10:30:00Z).");
  }

  const message = {
    notification: {
      title,
      body,
    },
    token,
  };

  // Schedule the notification
  schedule.scheduleJob(scheduledTime, async () => {
    try {
      const response = await admin.messaging().send(message);
      console.log("Notification sent:", response);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  });

  res.status(200).send(`Notification scheduled at ${scheduledTime}`);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
