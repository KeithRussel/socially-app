const express = require("express");
const router = express.Router();
const {
  getPosts,
  setPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getPosts).post(protect, setPosts);
router.route("/:id").delete(protect, deletePost).put(protect, updatePost);

module.exports = router;
