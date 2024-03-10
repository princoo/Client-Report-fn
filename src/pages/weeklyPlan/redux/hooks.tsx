import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getTasks, removeTaskReducer, toogleStatusReducer } from './weeklyPlanSlice';
import store from '../../../redux/store';
import { useState } from 'react';
import { OnAddBody, OnAddResponse, OnDeleteResponse, OnUpdateResponse } from '../interface';

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const { loading, error, tasks } = useAppSelector((state) => state.tasks);

  const [onStatusUpdate, setonStatusUpdate] = useState<{
    loading: boolean;
    data: OnUpdateResponse | null;
    error: string | null;
  }>({
    loading: false,
    data: null,
    error: null,
  });
  const [onDeleteTask, setonDeleteTask] = useState<{
    loading: boolean;
    data: OnDeleteResponse | null;
    error: string | null;
  }>({
    loading: false,
    data: null,
    error: null,
  });
  const [onAdd, setonAdd] = useState<{
    loading: boolean;
    data: OnAddResponse | null;
    error: string | null;
  }>({
    loading: false,
    data: null,
    error: null,
  });
  const fetchTasks = () => {
    dispatch(getTasks());
  };

  const addTask = async (body: OnAddBody) => {
    setonAdd((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));
    try {
      const response: { data: OnAddResponse } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/task/add`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.getState().token.value}`,
          },
        }
      );
      setonAdd((prev) => ({
        ...prev,
        loading: false,
        error: null,
        data: response.data,
      }));
      // dispatch(addTaskReducer(response.data.data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setonAdd((prev) => ({
        ...prev,
        loading: false,
        error: error.response.data.message || error.response.data.error || 'internal error',
      }));
    }
  };

  const toogleStatus = async (id: string) => {
    setonStatusUpdate((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const response: { data: OnUpdateResponse } = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/task/status/${id}`,
        {}, // No data to send in the body
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.getState().token.value}`,
          },
        }
      );
      setonStatusUpdate((prev) => ({
        ...prev,
        loading: false,
        data: response.data,
      }));
      dispatch(toogleStatusReducer(response.data));
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setonStatusUpdate((prev) => ({
        ...prev,
        loading: false,
        error: error.response.data.message || error.response.data.error || 'internal error',
      }));
    }
  };
  const deleteTask = async (tid: string) => {
    setonDeleteTask((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));
    try {
      const response: { data: OnDeleteResponse } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/task/${tid}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.getState().token.value}`,
          },
        }
      );
      setonDeleteTask((prev) => ({
        ...prev,
        loading: false,
        data: response.data,
      }));
      dispatch(removeTaskReducer(tid));
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setonDeleteTask((prev) => ({
        ...prev,
        loading: false,
        error: error.response.data.message || error.response.data.error || 'internal error',
      }));
    }
  };

  return {
    fetchTasks,
    toogleStatus,
    deleteTask,
    addTask,
    onAdd,
    loading,
    error,
    tasks,
    onStatusUpdate,
    onDeleteTask,
  };
};
