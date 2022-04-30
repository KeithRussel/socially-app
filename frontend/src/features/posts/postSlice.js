import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

// Get user from localStorage
// const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  posts: [],
  singlepost: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get user posts
export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (userId, thunkAPI) => {
    try {
      return await postService.getUserPosts(userId);
    } catch (error) {
      const message =
        (error.respose && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all public posts
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      return await postService.getPosts();
    } catch (error) {
      const message =
        (error.respose && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create user Post
export const setPost = createAsyncThunk(
  "posts/setPost",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.setPost(postData, token);
    } catch (error) {
      const message =
        (error.respose && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user post
export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.deletePost(id, token);
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

// Get user single post
export const getPost = createAsyncThunk(
  "posts/getSinglePost",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.getPost(id, token);
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

// Get user single post
export const nullPost = createAsyncThunk(
  "posts/nullSinglePost",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.getPost(id, token);
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

// Update user post
export const updatePost = createAsyncThunk(
  "posts/update",
  async (post, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.updatePost(post._id, post, token);
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

// Like a post
export const likePost = createAsyncThunk(
  "posts/likePost",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.likePost(id, token);
    } catch (error) {
      const message =
        (error.respose && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.post = action.payload;
        state.posts.unshift(action.payload);
      })
      .addCase(setPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateIsSuccess = true;
        state.posts = state.posts.map((post) => post._id === action.payload.id);
        // state.singlepost = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // .addCase(getPost.pending, (state) => {
      //   state.isLoading = true;
      // })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singlepost = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(nullPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singlepost = null;
      })
      .addCase(likePost.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        );
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;
