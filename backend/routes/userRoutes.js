// backend/routes/userRoutes.js
const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/store-user", async (req, res) => {
  const { username, walletAddress } = req.body;

  try {
    const newUser = new User({ username, walletAddress });
    await newUser.save();
    res.status(200).send("User data stored successfully.");
  } catch (error) {
    console.error("Error storing user data:", error);
    res.status(500).send("Failed to store user data.");
  }
});

module.exports = router;
