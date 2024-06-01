require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const express = require("express");
const cors = require("cors");
const app = express();

const User = require("./models/user.model");
const Note = require("./models/note.model");

const jwt = require("jsonwebtoken");

const { authenticationToken } = require("./lib/utils");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: process.env.ACCESS_TOKEN_SECRET });
});

// Create account

app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: true, message: "Required field" });
  }

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({
      error: true,
      message: "User already exist",
    });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3600m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successfull",
  });
});

// Account Login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Field Required" });
  }

  const userInfo = await User.findOne({ email });

  if (!userInfo) {
    return res.status(400).json({ message: "User not Found" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: true,
      message: "Login Successfull",
      email: true,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});

// get user
app.get("/get-user", authenticationToken, async (req, res) => {
  const { user } = req.user;
  const isUser = await User.findOne({ _id: user._id });
  if (!isUser) {
    return res.status(401);
  }
  return res.json({
    user: isUser,
    message: ""
  });
});

// Creating note
app.post("/create-note", authenticationToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title || !content) {
    return res.status(400).json({ error: true, messae: "Field is required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Get all notes
app.get("/notes", authenticationToken, async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({
      userId: user._id,
    }).sort({ isPinned: -1 });

    return res.json({
      error: false,
      notes,
      message: "all note retrieved successfully",
    });
  } catch (error) {
    return res.status("404").json({ error: true, messae: "Data not found" });
  }
});

// Update Notes
app.put("/edit-note/:noteId", authenticationToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res.status(400).json({ error: true, message: "No Changes provided" });
  }

  try {
    const note = await Note.findOne({
      _id: noteId,
      userId: user._id,
    });

    if (!note) {
      return res.status(404).json({ error: true, message: "Record not found!" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;
    await note.save();
    return res.status(200).json({
      error: false,
      note,
      messae: "Uppdated successfully",
    });
  } catch (error) {
    return res.status(405).json({ error: true, messae: "Method not allowed" });
  }
});

// Delete Note
app.delete("/delete-note/:noteId", authenticationToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;

  try {
    const note = await Note.findOne({
      _id: noteId,
      userId: user._id,
    });

    if (!note) {
      return res.status(404).json({ error: true, message: "Record not found!" });
    }

    await Note.deleteOne({ _id: noteId, userId: user._id });

    return res.status(200).json({
      error: false,
      messae: "Deleted successfully",
    });
  } catch (error) {
    return res.status(405).json({ error: true, messae: "Method not allowed" });
  }
});
// Pin Note

app.put("/pinned-note", authenticationToken, async (req, res) => {});
app.listen(8000);

module.exports = app;
