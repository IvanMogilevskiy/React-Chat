/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import apiPath from '../apiPath.js';

export const fetchData = createAsyncThunk(
  'chat/fetchData',
  async (config) => {
    const { data } = await axios.get(apiPath.usersPath(), { headers: config });
    return data;
  },
);

const chatAdapter = createEntityAdapter();

const fetchChatDataSlice = createSlice({
  name: 'chat',
  initialState: chatAdapter.getInitialState({ status: 'idle' }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchData.fulfilled, (state) => {
        state.status = 'fulfilled';
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      });
  },
});

export const selectChat = (state) => state.chat;
export const selectChatError = (state) => state.chat.error;
export const { actions } = fetchChatDataSlice;
export default fetchChatDataSlice.reducer;
