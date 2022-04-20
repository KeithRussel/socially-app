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

const postService = {
  getPosts,
  setPost,
  getUserPosts,
};

export default postService;
