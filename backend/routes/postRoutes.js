const express = require("express");
const router = express.Router();
const {
  getPosts,
  setPost,
  updatePost,
  deletePost,
  likePost,
  getUserPosts,
  getUserPost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getPosts).post(protect, setPost);
router
  .route("/:id")
  .delete(protect, deletePost)
  .put(protect, updatePost)
  .get(protect, getUserPost);
router.route("/user/:id").get(getUserPosts);
router.put("/:id/like", protect, likePost);

module.exports = router;
