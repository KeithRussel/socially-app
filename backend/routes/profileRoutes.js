const express = require("express");
const router = express.Router();
const {
  getProfileMe,
  getProfiles,
  getUserProfile,
  deleteUserProfile,
  setProfile,
  createProfile,
} = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(getProfiles)
  // .post(protect, setProfile)
  .delete(protect, deleteUserProfile);
router.route("/me").get(protect, getProfileMe).put(protect, createProfile);
router.route("/user/:user_id").get(getUserProfile);
router.route("/:profile_id/edit").put(protect, setProfile);

module.exports = router;
