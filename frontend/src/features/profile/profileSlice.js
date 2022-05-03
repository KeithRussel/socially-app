import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";

// Get user from localStorage
// const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  profile: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get user profile
export const getProfile = createAsyncThunk(
  "profile/me",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await profileService.getProfile(token);
    } catch (error) {
      const message =
        (error.respose && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create profile
export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (profile, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await profileService.createProfile(profile, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Set or update profile
export const setProfile = createAsyncThunk(
  "profile/setProfile",
  async (profile, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await profileService.setProfile(profile._id, profile, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(setProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
