import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { logInUser } from './loginSlice';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const stats = useAppSelector((state) => state.login);

  const handleLogin = async (values: { email: string; password: string }) => {
    dispatch(logInUser(values));
    // return response;
  };

  return { handleLogin, stats };
};
