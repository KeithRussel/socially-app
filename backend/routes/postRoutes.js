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
  .patch(protect, likePost)
  .put(protect, updatePost)
  .get(protect, getUserPost);
router.route("/user/:id").get(getUserPosts);
// router.route("/edit/:id").put(protect, updatePost);
// router.put("/like/:id", protect, likePost);

module.exports = router;
