import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import store from '../../../redux/store';
import { initialTypes, OnUpdateResponse, TaskData } from '../interface';

const initialState: initialTypes = {
  loading: false,
  tasks: [],
  error: null,
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const getTasks = createAsyncThunk('tasks/get', async () => {
  return axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/task/all`, {
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
export const deleteTask = createAsyncThunk('task/delete', async (sid: string) => {
  return axios
    .delete(`${import.meta.env.VITE_BACKEND_URL}/task/${sid}`, {
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
export const toogleStatus = createAsyncThunk('task/status/toogle', async (id: string) => {
  return axios
    .patch(`${import.meta.env.VITE_BACKEND_URL}/task/status/${id}`, {
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

const TaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTaskReducer: (state, action: PayloadAction<TaskData>) => {
      state.tasks.push(action.payload);
    },
    toogleStatusReducer: (state, action: PayloadAction<OnUpdateResponse>) => {
      const updatedTaskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.data[1][0].id
      );
      if (updatedTaskIndex !== -1) {
        // Replace the task with the updated data
        state.tasks[updatedTaskIndex] = action.payload.data[1][0];
      }
    },
    removeTaskReducer: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
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
    builder.addCase(getTasks.pending, (state) => {
      state.error = null;
      state.tasks = [];
      state.loading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action: PayloadAction<TaskData[]>) => {
      state.loading = false;
      state.tasks = action.payload;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTask.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export const { addTaskReducer, toogleStatusReducer, removeTaskReducer } = TaskSlice.actions;
export default TaskSlice.reducer;
