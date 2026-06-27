const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const { generateAccessToken } = require("../utils/generateToken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    const token = generateAccessToken(user._id);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateAccessToken(user._id);

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMe = async (req, res) => {
  res.json({ user: req.user });
};

exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const updates = {};

    if (name?.trim()) updates.name = name.trim();

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select("-password -refreshToken");

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.googleSignIn = async (req,res ) => {
  try {
    const { idToken } = req.body;

    if(!idToken) {
      return res.status(400).json({message: "Google ID is required."})
    }

    const ticket = await client.verifyIdToken ({
      idToken, 
      audience: process.env.GOOGLE_CLIENT_ID

    });

    const payload = ticket.getPayload();

    const {
      sub: googleId,
      email, 
      name,
      picture,
      email_verified,

    } = payload;

    if(!email_verified) {
      return res.status(401).json({message:"Google email is not verified" });
    };

    let user = await User.findOne({
      email: email.toLowerCase(),
    });

    if(user) {
      if(!user.googleId){
        user.googleId = googleId;
      }
      if(!user.avatar && picture) {
        user.avatar = picture;
      }
      await user.save();

    } else {
      user = await User.create({
        name,
        email: email.toLowerCase(),
        googleId,
        avatar: picture,

      })
    }

    const token = generateAccessToken(user._id);


    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      }, token,
    });
  } catch (error) {
    console.error(error) 
    res.status(500).json({message: "google signin failed!"});
  }
}