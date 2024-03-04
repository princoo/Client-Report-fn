import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import store from '../../../redux/store';
import { initialTypes, SupportGroupData } from '../interface';

const initialState: initialTypes = {
  loading: false,
  supportGroups: [],
  error: null,
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const getSupportGroups = createAsyncThunk(
  'supportgroup/get',
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    return axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/supportgroup/?page=${page}&pageSize=${pageSize}`, {
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
export const deleteSupportGroup = createAsyncThunk('supportgroup/delete', async (sid: string) => {
  return axios
    .delete(`${import.meta.env.VITE_BACKEND_URL}/supportgroup/${sid}`, {
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
// export const getSingleSupportGroups = createAsyncThunk(
//   'supportgroup/single',
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   async (id: string) => {
//     return axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/supportgroup/${id}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${store.getState().token.value}`,
//         },
//       })
//       .then((response) => {
//         const { data } = response.data;
//         return data;
//       })
//       .catch((error) => {
//         return rejectWithValue(
//           error.response.data.message || error.response.data.error || 'internal error'
//         );
//       });
//   }
// );

const supportGroupSlice = createSlice({
  name: 'supportgroups',
  initialState,
  reducers: {
    addSupportGroupReducer: (state, action: PayloadAction<SupportGroupData>) => {
      state.supportGroups.push(action.payload);
    },
    // removeReport: (state, action: PayloadAction<string>) => {
    //   state.reports = state.reports.filter((report) => report.id !== action.payload);
    // },
    // updateReports: (state, action: PayloadAction<Report>) => {
    //   const updatedReport = action.payload;
    //   const index = state.reports.findIndex((report) => report.id === updatedReport.id);
    //   if (index !== -1) {
    //     state.reports[index] = updatedReport;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getSupportGroups.pending, (state) => {
      state.error = null;
      state.supportGroups = [];
      state.loading = true;
    });
    builder.addCase(
      getSupportGroups.fulfilled,
      (state, action: PayloadAction<SupportGroupData[]>) => {
        state.loading = false;
        state.supportGroups = action.payload;
      }
    );
    builder.addCase(getSupportGroups.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
    builder.addCase(deleteSupportGroup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteSupportGroup.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteSupportGroup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export const { addSupportGroupReducer } = supportGroupSlice.actions;
export default supportGroupSlice.reducer;
