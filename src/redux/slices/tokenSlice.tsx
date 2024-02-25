import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
  value: string | null;
}

const initialState: TokenState = {
  value: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.value = action.payload;
    },
    clearToken: (state) => {
      state.value = null;
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
