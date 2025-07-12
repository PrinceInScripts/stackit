import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/questions');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const createQuestion = createAsyncThunk(
  'questions/createQuestion',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post('/questions', data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getSingleQuestion = createAsyncThunk(
  'questions/getSingleQuestion',
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/questions/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const searchQuestions = createAsyncThunk(
  'questions/searchQuestions',
  async (keyword, thunkAPI) => {
    try {
      const res = await axios.get(`/questions/search/${keyword}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const questionSlice = createSlice({
  name: 'questions',
  initialState: {
    list: [],
    single: null,
    searchResults: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch questions';
      })
      .addCase(createQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create question';
      })
      .addCase(getSingleQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleQuestion.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Fetched single question:', action.payload);
        state.single = action.payload;
      })
      .addCase(getSingleQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to load question';
      })
      .addCase(searchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Search failed';
      });
  },
});

export default questionSlice.reducer;
