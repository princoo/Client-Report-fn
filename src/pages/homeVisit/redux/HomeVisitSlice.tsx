import axios from 'axios';
import { HomeVisitData, initialTypes } from '../interface';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import store from '../../../redux/store';

const initialState: initialTypes = {
  loading: false,
  homeVisits: [],
  error: null,
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const getHomeVisits = createAsyncThunk(
  'homevisit/get',
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    return axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/homevisit/?page=${page}&pageSize=${pageSize}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${store.getState().token.value}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        return data;
      })
      .catch((error) => {
        return rejectWithValue(
          error.response.data.message || error.response.data.error || 'internal error'
        );
      });
  }
);
export const deleteHomevisit = createAsyncThunk('homevisit/delete', async (hid: string) => {
  return axios
    .delete(`${import.meta.env.VITE_BACKEND_URL}/homevisit/${hid}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${store.getState().token.value}`,
      },
    })
    .then((response) => {
      const { data } = response.data;
      return data;
    })
    .catch((error) => {
      return rejectWithValue(
        error.response.data.message || error.response.data.error || 'internal error'
      );
    });
});

const homeVisitSlice = createSlice({
  name: 'homevisit',
  initialState,
  reducers: {
    addHomeGroupReducer: (state, action: PayloadAction<HomeVisitData>) => {
      state.homeVisits.unshift(action.payload);
    },
    removeHomeVisitReducer: (state, action: PayloadAction<string>) => {
      state.homeVisits = state.homeVisits.filter((item) => item.id !== action.payload);
    },
    // updateReports: (state, action: PayloadAction<Report>) => {
    //   const updatedReport = action.payload;
    //   const index = state.reports.findIndex((report) => report.id === updatedReport.id);
    //   if (index !== -1) {
    //     state.reports[index] = updatedReport;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getHomeVisits.pending, (state) => {
      state.error = null;
      state.homeVisits = [];
      state.loading = true;
    });
    builder.addCase(getHomeVisits.fulfilled, (state, action: PayloadAction<HomeVisitData[]>) => {
      state.loading = false;
      state.homeVisits = action.payload;
    });
    builder.addCase(getHomeVisits.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
    builder.addCase(deleteHomevisit.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteHomevisit.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteHomevisit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export const { addHomeGroupReducer, removeHomeVisitReducer } = homeVisitSlice.actions;
export default homeVisitSlice.reducer;
