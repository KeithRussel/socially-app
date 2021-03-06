const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const Post = require("../models/postModel");
const User = require("../models/userModel");

// @desc    Get posts
// @route   GET /api/posts
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ updatedAt: -1 })
    .populate("user", ["name", "email"]);

  res.status(200).json(posts);
});

// @desc    Get user posts by id
// @route   GET /api/posts/user/:id
// @access  Public
const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({
    user: req.params.id,
  }).populate("user", ["name", "email"]);

  if (!posts) {
    res.status(401);
    throw new Error("This user have no posts");
  }

  res.status(200).json(posts);
});

// @desc    Set post
// @route   POST /api/posts
// @access  Private
const setPost = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const post = await Post.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(post);
});

// @desc    Get user post by id
// @route   GET /api/posts/:id
// @access  Private
const getUserPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json(post);
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

// @desc    Like a post
// @route   PUT /api/posts/like/:id
// @access  Private
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  // Remove index
  const removeIndex = post.likes
    .map((like) => like.user.toString())
    .indexOf(req.user.id);

  if (
    // If post already liked
    post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
  ) {
    // Unlike post
    post.likes.splice(removeIndex, 1);
  } else if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length ===
    0
  ) {
    // Like post
    post.likes.unshift({ user: req.user.id });
  } else {
    res.status(401);
    throw new Error("Something is wrong in Like data");
  }

  await post.save();

  res.status(200).json(post.likes);

  // res.status(200).json({ message: "Liked" });
});

// @desc    Delete post
// @route   DELETE /api/posts
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await post.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc    Comment on post
// @route   POST /api/posts/comment/:id
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  const user = await User.findById(req.user.id).select("-password");

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const newComment = {
    text: req.body.text,
    name: user.name,
    user: req.user.id,
  };

  post.comments.push(newComment);

  await post.save();

  res.status(200).json(post.comments);
});

module.exports = {
  getPosts,
  setPost,
  updatePost,
  deletePost,
  likePost,
  getUserPosts,
  getUserPost,
  addComment,
};
