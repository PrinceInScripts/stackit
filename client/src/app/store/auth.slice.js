import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', credentials);
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post('/users/register', data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    message: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
    builder
  .addCase(registerUser.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(registerUser.fulfilled, (state, action) => {
    state.loading = false;
    state.message = action.payload.message || 'Registration successful';
  })
  .addCase(registerUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload?.message || 'Registration failed';
  })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
