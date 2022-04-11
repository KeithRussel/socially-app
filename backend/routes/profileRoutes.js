const express = require("express");
const router = express.Router();
const {
  getProfileMe,
  setProfile,
  getProfiles,
  getUserProfile,
} = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getProfiles).post(protect, setProfile);
router.route("/me").get(protect, getProfileMe);
router.route("/user/:user_id").get(getUserProfile);

module.exports = router;
