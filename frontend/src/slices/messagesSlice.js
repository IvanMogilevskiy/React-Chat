import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { fetchData } from './chatSlice.js';
import { removeChannel } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action.payload.messages);
      })
      .addCase(removeChannel, (state, action) => {
        const removedId = action.payload;
        const entities = Object.values(state.entities);
        const restEntities = entities.filter((e) => e.channelId !== removedId);
        messagesAdapter.setAll(state, restEntities);
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const selectMessages = selectors.selectAll;
export const selectCurrentMessages = createSelector(
  selectMessages,
  (state) => state.channels.currentChannelId,
  (messages, currentChannelId) => messages.filter((msg) => msg.channelId === currentChannelId),
);
export const selectLatestMessage = createSelector(
  selectCurrentMessages,
  (currentMessages) => currentMessages[currentMessages.length - 1],
);
export default messagesSlice.reducer;
