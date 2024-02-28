/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { InitialTypes, UserFields } from '../../interface';

const initialState: InitialTypes = {
  loading: false,
  value: null,
  error: null,
};

function rejectWithValue(error: string) {
  throw new Error(error);
}
export const signUpUser = createAsyncThunk(
  'user/signup',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ confirmPassword, ...rest }: UserFields) => {
    return axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/signup`, rest)
      .then((response) => {
        return response.data.token;
      })
      .catch((error) => {
        return rejectWithValue(error.response.data.message || 'internal error');
      });
  }
);

const SignUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    addResponse: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.error = null;
      state.value = null;
      state.loading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export const { addResponse } = SignUpSlice.actions;
export default SignUpSlice.reducer;
