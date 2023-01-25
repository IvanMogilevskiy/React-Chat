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
const selectModalType = (state) => state.modals.type;
export { selectModalType };
export const selectCurrentChannel = (state) => state.modals.item;
export const { openModal, hideModal } = modalsSlice.actions;
export default modalsSlice.reducer;
