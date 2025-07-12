// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

// 1) Reload the logged-in user’s own profile (optional if you keep this in authSlice)
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/users/profile');
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// 2) Update the logged-in user’s profile
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (profileUpdates, thunkAPI) => {
    try {
      const { data } = await axios.patch('/users/profile', profileUpdates);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// 3) Fetch all users (for admin dashboard)
export const fetchAllUsers = createAsyncThunk(
  'user/fetchAllUsers',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/users/all');
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,    // your own user’s profile (if used here)
    users: [],        // admin list
    loading: false,
    error: null,
  },
  reducers: {
    // (you can add resetProfile, etc. if needed)
  },
  extraReducers: (builder) => {
    builder
      // fetchUserProfile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profile = payload;
      })
      .addCase(fetchUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || 'Could not load profile';
      })

      // updateUserProfile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profile = payload;
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || 'Could not update profile';
      })

      // fetchAllUsers
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload;
      })
      .addCase(fetchAllUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || 'Could not load users';
      });
  },
});

export default userSlice.reducer;
