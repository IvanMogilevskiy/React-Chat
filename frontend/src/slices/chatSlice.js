import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../components/routes.js';

export const fetchData = createAsyncThunk(
  'chat/fetchData',
  async (config) => {
    const { data } = await axios.get(routes.usersPath(), { headers: config });
    return data;
  },
);

const chatAdapter = createEntityAdapter();

const chatSlice = createSlice({
  name: 'chat',
  initialState: chatAdapter.getInitialState({ status: 'idle', error: null }),
  reducers: {},
  extraReducers: {},
});

export const { actions } = chatSlice;
export default chatSlice.reducer;
