/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { InitialTypes } from '../../interface';
// import store from '../../../../redux/store';
// import { setToken } from '../../../../redux/slices/tokenSlice';

const initialState: InitialTypes = {
  loading: false,
  value: null,
  error: null,
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const logInUser = createAsyncThunk(
  'user/login',
  async (values: { email: string; password: string }) => {
    return axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/login`, values)
      .then((response) => {
        return response.data.token;
      })
      .catch((error) => {
        return rejectWithValue(error.response.data.message || 'internal error');
      });
  }
);

const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInUser.pending, (state) => {
      state.error = null;
      state.value = null;
      state.loading = true;
    });
    builder.addCase(logInUser.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(logInUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export const { addToken } = LoginSlice.actions;
export default LoginSlice.reducer;
