/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { initialTypes, Report } from '../viewReports/interface';
import store from '../../../redux/store';

const initialState: initialTypes = {
  loading: false,
  reports: [],
  error: null,
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const getReports = createAsyncThunk(
  'reports/get',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async () => {
    return axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/report/all`, {
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
        return rejectWithValue(error.response.data.message || 'internal error');
      });
  }
);

const ReportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    addReports: (state, action: PayloadAction<Report>) => {
      state.reports.push(action.payload);
    },
    removeReport: (state, action: PayloadAction<string>) => {
      state.reports = state.reports.filter((report) => report.id !== action.payload);
    },
    updateReports: (state, action: PayloadAction<Report>) => {
      const updatedReport = action.payload;
      const index = state.reports.findIndex((report) => report.id === updatedReport.id);
      if (index !== -1) {
        state.reports[index] = updatedReport;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReports.pending, (state) => {
      state.error = null;
      state.reports = [];
      state.loading = true;
    });
    builder.addCase(getReports.fulfilled, (state, action: PayloadAction<Report[]>) => {
      state.loading = false;
      state.reports = action.payload;
    });
    builder.addCase(getReports.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export const { addReports, removeReport, updateReports } = ReportsSlice.actions;
export default ReportsSlice.reducer;
