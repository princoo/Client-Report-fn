import { useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import {
  HomeVisitData,
  OnAddBody,
  OnAddResponse,
  OnAddState,
  OnDeleteResponse,
  OnDeleteState,
} from '../interface';
import { getHomeVisits } from './HomeVisitSlice';
import axios from 'axios';
import store from '../../../redux/store';

export const useHomeVisits = () => {
  const dispatch = useAppDispatch();

  const [onAdd, setonAdd] = useState<OnAddState>({
    loading: false,
    data: null,
    error: null,
  });
  const [onDelete, setOnDelete] = useState<OnDeleteState>({
    loading: false,
    data: null,
    error: null,
  });
  const fetchHomeVisits = (page: number, pageSize: number) => {
    dispatch(getHomeVisits({ page, pageSize }));
  };
  const addHomeVisit = async (body: OnAddBody) => {
    setonAdd((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));
    const formData = new FormData();
    for (const img of body.images) {
      formData.append('images', img as File);
    }
    formData.append('date', body.date);
    formData.append('clientName', body.clientName);
    formData.append('phone', body.phone);
    formData.append('description', body.description);
    try {
      const response: { data: OnAddResponse } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/homevisit/add`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${store.getState().token.value}`,
          },
        }
      );
      const obj: HomeVisitData = {
        ...response.data.data,
        User: response.data.User,
        HVisitImages: [...response.data.HVisitImages],
      };
      setonAdd((prev) => ({
        ...prev,
        loading: false,
        error: null,
        data: obj,
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setonAdd((prev) => ({
        ...prev,
        loading: false,
        error: error.response.data.message || error.response.data.error || 'internal error',
      }));
    }
  };
  const removeHomeVisit = async (hid: string) => {
    setOnDelete((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));
    try {
      const response: { data: OnDeleteResponse } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/homevisit/${hid}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.getState().token.value}`,
          },
        }
      );
      setOnDelete((prev) => ({
        ...prev,
        loading: false,
        data: response.data.data,
      }));
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setOnDelete((prev) => ({
        ...prev,
        loading: false,
        error: error.response.data.message || error.response.data.error || 'internal error',
      }));
    }
  };

  return { fetchHomeVisits, addHomeVisit, removeHomeVisit, onAdd, onDelete };
};
