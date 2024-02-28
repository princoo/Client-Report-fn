import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getSites } from '../../../../redux/slices/siteSlice';
import { UserFields } from '../../interface';
import { signUpUser } from './signUpSlice';
// import { setToken } from '../../../../redux/slices/tokenSlice';

export const useSignUp = () => {
  const dispatch = useAppDispatch();
  const stats = useAppSelector((state) => state.signup);
  const handleSignUp = async (values: UserFields) => {
    dispatch(signUpUser(values));
  };

  return { handleSignUp, stats };
};

export const useSites = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSites());
  }, [dispatch]);
};
