import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isValidToken: false,
  error: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setTokenValidity(state, action) {
      state.isValidToken = action.payload.isValid;
      state.error = action.payload.error;
    },
  },
});

export const { setTokenValidity } = tokenSlice.actions;

export default tokenSlice.reducer;