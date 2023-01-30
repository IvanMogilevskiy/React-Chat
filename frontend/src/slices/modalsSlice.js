/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    type: null,
    item: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload.type;
      state.item = payload.item;
    },
    hideModal: (state) => {
      state.type = null;
      state.item = null;
    },
  },
});
export const selectModal = (state) => state.modals;
export const { openModal, hideModal } = modalsSlice.actions;
export default modalsSlice.reducer;
