import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Sites {
  id: string;
  name: string;
}
interface SitesState {
  value: Sites[];
  error: string | null;
  loading: boolean;
}

const initialState: SitesState = {
  value: [],
  error: null,
  loading: false,
};
function rejectWithValue(error: string) {
  throw new Error(error);
}
export const getSites = createAsyncThunk(
  'sites/all',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async () => {
    return axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/sites`)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response.data.message || 'internal error');
      });
  }
);

const sitesSlice = createSlice({
  name: 'sites',
  initialState,
  reducers: {
    addSite: (state, action: PayloadAction<Sites>) => {
      state.value.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSites.pending, (state) => {
      state.error = null;
      state.value = [];
      state.loading = true;
    });
    builder.addCase(getSites.fulfilled, (state, action: PayloadAction<Sites[]>) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(getSites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export const { addSite } = sitesSlice.actions;
export default sitesSlice.reducer;
