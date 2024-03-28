// screenWidthSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMobile: window.innerWidth < 768,
};

const screenWidthSlice = createSlice({
  name: 'screenWidth',
  initialState,
  reducers: {
    setScreenWidth: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});

export const { setScreenWidth } = screenWidthSlice.actions;

export default screenWidthSlice.reducer;