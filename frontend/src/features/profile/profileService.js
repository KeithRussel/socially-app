import axios from "axios";

const API_URL = "/api/profile/";

// Get me profile
const getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "me", config);

  return response.data;
};

// Update profile
const setProfile = async (id, profile, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + `${id}/edit`, profile, config);
  console.log(response.data);

  return response.data;
};

// Create profile
const createProfile = async (profile, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + `me`, profile, config);
  console.log(response.data);

  return response.data;
};

const profileService = {
  getProfile,
  setProfile,
  createProfile,
};

export default profileService;
