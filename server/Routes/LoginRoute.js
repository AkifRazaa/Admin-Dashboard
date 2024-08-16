const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log({ email, password });

  try {
    const user = await User.findOne({ email });

    // If user does not exists send Invalid credentials message.
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    //Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    // Create and assign a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log(token);
    res.json({ success: true, token, userId: user._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
