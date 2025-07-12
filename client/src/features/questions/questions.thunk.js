// src/features/questions/questions.thunks.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axios'

// get a single question by ID
export const getSingleQuestion = createAsyncThunk(
  'questions/getSingleQuestion',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/questions/${id}`)
      return data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

// search questions by keyword
export const searchQuestions = createAsyncThunk(
  'questions/searchQuestions',
  async (keyword, thunkAPI) => {
    try {
      const { data } = await axios.get(`/questions/search/${keyword}`)
      return data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

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