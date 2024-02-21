import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface InitialTypes {
  value: string;
  status: string;
}

const initialState: InitialTypes = {
  value: '',
  status: 'idle',
};

export const logInUser = createAsyncThunk('login', async () => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
});

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
      state.status = 'loading';
    });
    builder.addCase(logInUser.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    builder.addCase(logInUser.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { addToken } = LoginSlice.actions;
export default LoginSlice.reducer;
