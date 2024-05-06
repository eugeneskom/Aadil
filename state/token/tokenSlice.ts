import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

// Selector function to get the token from the state
export const selectToken = (state: { auth: AuthState }) => state.auth.token;

export const { setToken } = authSlice.actions;
export default authSlice.reducer;