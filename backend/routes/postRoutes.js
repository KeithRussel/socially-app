const express = require("express");
const router = express.Router();
const {
  getPosts,
  setPost,
  updatePost,
  deletePost,
  likePost,
  getUserPosts,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getPosts).post(protect, setPost);
router.route("/:id").delete(protect, deletePost).put(protect, updatePost);
router.route("/like/:id").put(protect, likePost);
router.route("/user/:id").get(getUserPosts);

module.exports = router;
