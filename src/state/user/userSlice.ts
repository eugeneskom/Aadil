import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../types/UserType';
import { RootState } from '../store'; // Assuming RootState is your Redux store's root state type

interface UserState {
  user: UserType | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;

// Define a selector to get the user data from the state
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
