import { useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  OnAddSgResponse,
  OnDeleteStates,
  OnUpdateResponse,
  OnUpdateStates,
  SupportGroupBody,
  deleteSgResponse,
  singleSgResponse,
} from '../interface';
import store from '../../../redux/store';
// import { addReports } from './reportsSlice';
import { getSupportGroups } from './supportGroupSlice';

export const useSupportGroups = () => {
  const dispatch = useAppDispatch();
  const [isAddLoading, setAddLoading] = useState<boolean>(false);
  const [isAddError, setAddError] = useState<string | null>(null);
  const [onDelete, setOnDelete] = useState<OnDeleteStates>({
    loading: false,
    data: null,
    error: null,
  });
  const [onDeleteImage, setonDeleteImage] = useState<{
    loading: boolean;
    data: number | null;
    error: string | null;
  }>({
    loading: false,
    data: null,
    error: null,
  });
  const [onUpdate, setonUpdate] = useState<OnUpdateStates>({
    loading: false,
    data: null,
    error: null,
  });
  const { loading, error, supportGroups } = useAppSelector((state) => state.supportgroups);
  const [singleSGroup, setsingleSGroup] = useState<singleSgResponse | null>(null);

  const fetchSupportGroups = (page: number, pageSize: number) => {
    dispatch(getSupportGroups({ page, pageSize }));
  };
  const addSupportGroup = async (body: SupportGroupBody) => {
    setAddLoading(true);
    setAddError(null);
    const formData = new FormData();
    for (const img of body.images) {
      formData.append('images', img as File);
    }
    formData.append('date', body.date);
    formData.append('title', body.title);
    formData.append('description', body.description);
    try {
      const response: { data: OnAddSgResponse } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/supportgroup/add`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${store.getState().token.value}`,
          },
        }
      );
      setAddLoading(false);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setAddLoading(false);
      setAddError(error.response.data.message || error.response.data.error || 'internal error');
    }
  };

  const getSingleSupportGroup = async (id: string) => {
    setAddLoading(true);
    setAddError(null);
    try {
      const response: { data: singleSgResponse } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/supportgroup/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.getState().token.value}`,
          },
        }
      );
      setAddLoading(false);
      setsingleSGroup(response.data);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setAddLoading(false);
      setAddError(error.response.data.message || error.response.data.error || 'internal error');
    }
  };

  const removeSupportGroup = async (sid: string) => {
    setOnDelete((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));
    try {
      const response: { data: deleteSgResponse } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/supportgroup/${sid}`,
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

  const deleteSGImages = async (sid: string, imageId: string) => {
    setonDeleteImage((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));
    try {
      const response: { data: { removedImages: Array<number> } } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/supportgroup/images/${sid}`,
        {
          data: { imageId },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.getState().token.value}`,
          },
        }
      );
      setonDeleteImage((prev) => ({
        ...prev,
        loading: false,
        data: response.data.removedImages[0],
      }));
      return response.data.removedImages;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setonDeleteImage((prev) => ({
        ...prev,
        loading: false,
        error: error.response.data.message || error.response.data.error || 'internal error',
      }));
    }
  };

  const updateSupportGroup = async (body: Omit<SupportGroupBody, 'images'>, sid: string) => {
    setonUpdate((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));
    try {
      const response: { data: OnUpdateResponse } = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/supportgroup/${sid}`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.getState().token.value}`,
          },
        }
      );
      setonUpdate((prev) => ({
        ...prev,
        loading: false,
        data: response.data.data,
      }));
      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setonUpdate((prev) => ({
        ...prev,
        loading: false,
        error: error.response.data.message || error.response.data.error || 'internal error',
      }));
    }
  };

  return {
    fetchSupportGroups,
    addSupportGroup,
    getSingleSupportGroup,
    removeSupportGroup,
    deleteSGImages,
    updateSupportGroup,
    loading,
    error,
    supportGroups,
    isAddError,
    isAddLoading,
    singleSGroup,
    onDeleteImage,
    onDelete,
    onUpdate,
  };
};
