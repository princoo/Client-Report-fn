import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { AddReportBody, OnAddResponse, OnUpdateResponse } from '../viewReports/interface';
import { getReports } from './reportsSlice';
import axios from 'axios';
import store from '../../../redux/store';
// import { addReports } from './reportsSlice';

export const useReports = () => {
  const dispatch = useAppDispatch();
  const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
  const [isAddError, setIsAddError] = useState<string | null>(null);
  const [isUpdateLoading, setUpdateLoading] = useState<boolean>(false);
  const [isUpdateError, setUpdateError] = useState<string | null>(null);
  const { loading, error, reports } = useAppSelector((state) => state.reports);

  const fetchReports = () => {
    dispatch(getReports());
  };
  const addReport = async (body: AddReportBody) => {
    setIsAddLoading(true);
    setIsAddError(null);
    try {
      const response: OnAddResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/report/daily`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.getState().token.value}`,
          },
        }
      );
      setIsAddLoading(false);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsAddLoading(false);
      setIsAddError(error.response.data.message || 'internal error');
    }
  };
  const updateReport = async (body: AddReportBody, rid: string) => {
    setUpdateLoading(true);
    setUpdateError(null);
    try {
      const response: OnUpdateResponse = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/report/update/${rid}`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.getState().token.value}`,
          },
        }
      );
      setUpdateLoading(false);
      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setUpdateLoading(false);
      setUpdateError(error.response.data.message || error.response.data.error || 'internal error');
    }
  };

  return {
    fetchReports,
    addReport,
    updateReport,
    loading,
    error,
    reports,
    isAddError,
    isAddLoading,
    isUpdateLoading,
    isUpdateError,
  };
};
