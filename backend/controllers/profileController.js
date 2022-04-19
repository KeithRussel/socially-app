const asyncHandler = require("express-async-handler");

const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");

// @desc    Get posts
// @route   GET /api/profile/me
// @access  Private
const getProfileMe = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({
    user: req.user.id,
  }).populate("user", ["name", "email"]);

  if (!profile) {
    res.status(400);
    throw new Error("There is no profile for this user");
  }

  res.status(200).json(profile);

  //   res.json({ message: "User profile display" });
});

// @desc    Create or Update user profile
// @route   POST /api/profile
// @access  Private
const setProfile = asyncHandler(async (req, res) => {
  const profileFields = {
    bio: req.body.bio,
    address: req.body.address,
    interest: req.body.interest,
    user: req.user.id,
  };

  const profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    { $set: profileFields },
    { new: true, upsert: true }
  );

  res.status(200).json(profile);
  //   res.json({ message: "Create user profile" });
});

// @desc    Get all profile
// @route   POST /api/profile
// @access  Public
const getProfiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.find().populate("user", ["name", "email"]);

  res.status(200).json(profiles);
});

// @desc    Get user profile by id
// @route   GET /api/profile/user/:user_id
// @access  Public
const getUserProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.params.user_id }).populate(
    "user",
    ["name", "email"]
  );

  if (!profile) {
    res.status(400);
    throw new Error("Profile not found");
  }

  res.status(200).json(profile);
});

// @desc    Delete profile, user & posts
// @route   GET /api/profile/
// @access  Private
const deleteUserProfile = asyncHandler(async (req, res) => {
  // Delete profile
  await Profile.findOneAndRemove({ user: req.user.id });

  // Delete user account
  await User.findByIdAndRemove({ _id: req.user.id });

  // Delete user posts
  await Post.deleteMany({ user: req.user.id });

  res.status(200).json({ msg: "User Removed" });
});

module.exports = {
  getProfileMe,
  setProfile,
  getProfiles,
  getUserProfile,
  deleteUserProfile,
};
