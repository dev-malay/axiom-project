const express = require("express");
const router = express.Router();
const { register, login, getMe, updateProfile, googleSignIn } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");


const authMiddleware = require("../middleware/auth.middleware")

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleSignIn);

router.get("/me", protect, getMe);
router.patch("/profile",protect, updateProfile);

module.exports = router;
