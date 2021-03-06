import axios from "axios";

const API_URL = "/api/posts/";

// Create new post
const setPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, postData, config);

  return response.data;
};

// Get all posts
const getPosts = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// Get user posts
const getUserPosts = async (userId) => {
  const response = await axios.get(API_URL + `user/${userId}`);

  return response.data;
};

// Get user single post
const getPost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + postId, config);

  return response.data;
};

// Update user post
const updatePost = async (id, post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, post, config);
  console.log(response.data);

  return response.data;
};

// Update like post
const likePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(API_URL + `like/${postId}`, config);

  console.log(response.data);

  return response.data;
};

// Delete user post
const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + postId, config);

  console.log(response.data);

  return response.data;
};

const postService = {
  getPosts,
  setPost,
  getUserPosts,
  deletePost,
  updatePost,
  getPost,
  likePost,
};

export default postService;
