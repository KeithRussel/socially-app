const express = require("express");
const router = express.Router();
const {
  getPosts,
  setPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.route("/").get(getPosts).post(setPosts);
router.route("/:id").delete(deletePost).put(updatePost);

module.exports = router;
