const express = require('express');
const router = express.Router();

const userModel = require("../models/user.model");
// const bcrypt = require("bcryptjs");
const {
  handleUserSignUp,
  handleUserLogin,
  updateUserById,
  deleteUserById,
  logoutUser,
  getAlumniById,
  Sendcontactmail
} = require("../controllers/user.controllers");

router.get("/", (req, res) => {
  res.send("Welcome to    Alumni Network");
});

// Creating User Account
router.post("/register", handleUserSignUp);
router.post("/contactus", Sendcontactmail);
// Login User Account
router.post("/alumni/login", handleUserLogin);

// Update Alumni Data
router.patch("/alumni/:id", updateUserById);

// Delete Alumni Data
router.delete("/alumni/:id", deleteUserById);

// Get Alumni Data
router.get("/alumni", async (req, res) => {
  try {
    const users = await userModel.find().sort({ rollNo: 1 });
    res.send(users);
  } catch (err) {
    res.status(404).send("Data Not Found");
  }
});

// Get Alumni Data by ID
router.get("/alumni/:id", getAlumniById);

//Log Out
router.get("/alumni/logout", logoutUser);

module.exports = router;
