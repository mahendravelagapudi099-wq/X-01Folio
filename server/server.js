import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import path from "path";

// Explicitly load .env from server folder
dotenv.config({ path: path.resolve("./server/.env") });

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for your frontend
app.use(cors({ origin: "http://localhost:8081" }));
app.use(express.json());

// Debug: Check environment variables
console.log("SENDGRID_API_KEY:", process.env.SENDGRID_API_KEY);
console.log("RECEIVER_EMAIL:", process.env.RECEIVER_EMAIL);

// Verify SendGrid API Key
if (!process.env.SENDGRID_API_KEY?.startsWith("SG.")) {
  console.error("❌ Invalid or missing SendGrid API key!");
} else {
  console.log("✅ SendGrid API Key loaded");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

app.post("/send-mail", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  }

  const msg = {
    to: process.env.RECEIVER_EMAIL,
    from: process.env.RECEIVER_EMAIL, // verified sender
    subject: `New Contact Form Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong><br/>${message}</p>`,
  };

  try {
    await sgMail.send(msg);
    res.json({ success: true });
  } catch (error) {
    console.error("SendGrid error:", error);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
