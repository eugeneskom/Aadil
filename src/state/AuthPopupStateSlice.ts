import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthPopupOpen: boolean;
}

const initialState: AuthState = {
  isAuthPopupOpen: false,
};

const authSlice = createSlice({
  name: 'authPopupState',
  initialState,
  reducers: {
    toggleAuthPopup(state) {
      state.isAuthPopupOpen = !state.isAuthPopupOpen;
    },
    setAuthPopupOpen(state, action: PayloadAction<boolean>) {
      state.isAuthPopupOpen = action.payload;
    },
  },
});

export const { toggleAuthPopup, setAuthPopupOpen } = authSlice.actions;
export default authSlice.reducer;