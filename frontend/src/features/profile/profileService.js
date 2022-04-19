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

const profileService = {
  getProfile,
};

export default profileService;
