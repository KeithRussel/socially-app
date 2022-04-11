const asyncHandler = require("express-async-handler");

const Profile = require("../models/profileModel");

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

  res.status(200).json({
    profile,
  });

  //   res.json({ message: "User profile display" });
});

// @desc    Create user profile
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
  res.json({ message: "Get all profiles" });
});

module.exports = {
  getProfileMe,
  setProfile,
  getProfiles,
};
