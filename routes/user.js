const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

// Get user profile
router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// Update profile (bio, links)
router.put("/profile", auth, async (req, res) => {
  const { bio, links } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { bio, links }, { new: true });
  res.json(user);
});

module.exports = router;
const upload = require("../middleware/upload");

router.post("/upload", auth, upload.single("profilePic"), async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, { profilePic: req.file.path }, { new: true });
  res.json(user);
});

