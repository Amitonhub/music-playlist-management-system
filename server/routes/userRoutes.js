const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../controllers/userController");

// Profile
router.get("/profile", getUserProfile);

module.exports = router;
