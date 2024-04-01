// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isValidToken: false,
//   error: null,
// };

// const tokenSlice = createSlice({
//   name: 'token',
//   initialState,
//   reducers: {
//     setTokenValidity(state, action) {
//       state.isValidToken = action.payload.isValid;
//       state.error = action.payload.error;
//     },
//   },
// });

// export const { setTokenValidity } = tokenSlice.actions;

// export default tokenSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ValidationResponse {
  isValid: boolean;
  error: string | null;
}

const initialState: {
  isValidToken: boolean;
  error: string | null;
  loading: boolean;
} = {
  isValidToken: false,
  error: null,
  loading: false,
};

export const validateToken = createAsyncThunk<
  ValidationResponse,
  string,
  { rejectValue: ValidationResponse }
>('token/validateToken', async (token, { rejectWithValue }) => {
  try {

    console.log('parseToken Validate API', token)
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/validate-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data && response.data.success) {
      return { isValid: true, error: null };
    } else {
      return rejectWithValue({ isValid: false, error: response.data.message });
    }
  } catch (error) {
    console.error('Failed to validate token:', error);
    return rejectWithValue({ isValid: false, error: 'Failed to validate token' });
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
      .addCase(validateToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isValidToken = action.payload.isValid;
        state.error = action.payload.error;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.loading = false;
        state.isValidToken = action.payload?.isValid || false;
        state.error = action.payload?.error || 'Failed to validate token';
      });
  },
});

export default tokenSlice.reducer;