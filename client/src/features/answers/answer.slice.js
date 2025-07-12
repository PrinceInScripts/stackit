import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const createAnswer = createAsyncThunk(
  'answers/createAnswer',
  async (answerData, thunkAPI) => {
    try {
      const res = await axios.post('/answers', answerData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getAnswersByQuestion = createAsyncThunk(
  'answers/getAnswersByQuestion',
  async (questionId, thunkAPI) => {
    try {
      const res = await axios.get(`/answers/${questionId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const voteAnswer = createAsyncThunk(
  'answers/voteAnswer',
  async ({ id, value }, thunkAPI) => {
    try {
      const res = await axios.patch(`/answers/${id}/vote`, { value });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const moderateAnswer = createAsyncThunk(
  'answers/moderateAnswer',
  async ({ id, isApproved, adminComment }, thunkAPI) => {
    try {
      const res = await axios.patch(`/answers/${id}/moderate`, {
        isApproved,
        adminComment,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const answerSlice = createSlice({
  name: 'answers',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create answer';
      })
      .addCase(getAnswersByQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnswersByQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getAnswersByQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch answers';
      })
      .addCase(voteAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(voteAnswer.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(a => a._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(voteAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to vote answer';
      })
      .addCase(moderateAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moderateAnswer.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(a => a._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(moderateAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to moderate answer';
      });
  },
});

export default answerSlice.reducer;
