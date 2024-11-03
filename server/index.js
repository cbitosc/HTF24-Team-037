const express = require("express");
const connectDB = require("./db.js");
const cors = require("cors");
const User = require("./models/user.js");
const app = express();

app.use(express.json());
app.use(cors()); 
connectDB();

app.get("/", async (req, res) => {
  try {
    const response = await User.find();
    return res.json({ Users: response });
  } catch (error) {
    console.error("Database fetch error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
