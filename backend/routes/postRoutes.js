const express = require("express");
const router = express.Router();
const {
  getPosts,
  setPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.get("/", getPosts);
router.post("/", setPosts);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
