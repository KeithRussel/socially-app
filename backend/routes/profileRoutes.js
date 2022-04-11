const express = require("express");
const router = express.Router();
const {
  getProfileMe,
  setProfile,
  getProfiles,
} = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getProfiles).post(protect, setProfile);
router.route("/me").get(protect, getProfileMe);

module.exports = router;
