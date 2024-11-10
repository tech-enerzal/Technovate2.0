const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB (replace with your connection string)
mongoose.connect("mongodb+srv://techenerzal:Chatbot8188@cluster0.najcz.mongodb.net/SupplyChainDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Define User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  walletAddress: String,
});

const User = mongoose.model("User", userSchema, "SupplyChainDB" );

// API endpoint to store user data
app.post("/api/store-user", async (req, res) => {
  const { username, walletAddress } = req.body;
  console.log(username, walletAddress);

  try {
    const newUser = new User({ username, walletAddress });
    await newUser.save();  // Save to MongoDB

    res.status(201).json({ message: "User data saved successfully" });
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ message: "Error saving user data" });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
