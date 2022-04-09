// @desc    Get posts
// @route   GET /api/posts
// @access  Public
const getPosts = (req, res) => {
  res.json({ message: "Get posts" });
};

// @desc    Set post
// @route   POST /api/posts
// @access  Private
const setPosts = (req, res) => {
  res.json({ message: "Set post" });
};

// @desc    Update post
// @route   GET /api/posts/:id
// @access  Private
const updatePost = (req, res) => {
  res.json({ message: `Update post ${req.params.id}` });
};

// @desc    Delete post
// @route   DELETE /api/posts
// @access  Private
const deletePost = (req, res) => {
  res.json({ message: `Delete post ${req.params.id}` });
};

module.exports = {
  getPosts,
  setPosts,
  updatePost,
  deletePost,
};
