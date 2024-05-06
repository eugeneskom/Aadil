import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserType } from '../../types/UserType';


interface ValidationResponse {
  isValid: boolean;
  error: string | null;
  user: UserType | null;
}

const initialState: {
  isValidToken: boolean;
  error: string | null;
  loading: boolean;
  user: UserType | null;
} = {
  isValidToken: false,
  error: null,
  loading: false,
  user: null,
};

export const validateToken = createAsyncThunk<
  ValidationResponse,
  string,
  { rejectValue: ValidationResponse }
>('token/validateToken', async (token, { rejectWithValue }) => {
  try {
    console.log('parseToken Validate API', token);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/validate-token`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.data && response.data.success) {
      return { isValid: true, error: null, user: response.data.user };
    } else {
      return rejectWithValue({ isValid: false, error: response.data.message, user: null });
    }
  } catch (error) {
    console.error('Failed to validate token:', error);
    return rejectWithValue({ isValid: false, error: 'Failed to validate token', user: null });
  }
});

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(validateToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateToken.fulfilled, (state, action: PayloadAction<ValidationResponse>) => {
        state.loading = false;
        state.isValidToken = action.payload.isValid;
        state.error = action.payload.error;
        state.user = action.payload.user;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.loading = false;
        state.isValidToken = action.payload?.isValid || false;
        state.error = action.payload?.error || 'Failed to validate token';
        state.user = null;
      });
  },
});

export default tokenSlice.reducer;