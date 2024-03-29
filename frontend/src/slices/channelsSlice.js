/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { fetchData } from './chatSlice.js';

const defaultChannelId = 1;
const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: defaultChannelId,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, action) => {
      if (state.currentChannelId === action.payload) {
        state.currentChannelId = defaultChannelId;
      }
      channelsAdapter.removeOne(state, action.payload);
    },
    renameChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, {
        payload,
      }) => {
        channelsAdapter.addMany(state, payload.channels);
        state.currentChannelId = payload.currentChannelId;
      });
  },
});

export const {
  setCurrentChannel,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const selectChannels = selectors.selectAll;
export const selectChannelNames = createSelector(
  selectChannels,
  (channels) => channels.map((channel) => channel.name),
);
export const selectCurrentChannelId = (state) => state.channels.currentChannelId;
export const selectCurrentChannel = createSelector(
  (state) => state.channels.entities,
  selectCurrentChannelId,
  (entities, currentChannelId) => entities[currentChannelId],
);

export default channelsSlice.reducer;
