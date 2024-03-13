import { Outlet, Navigate } from 'react-router-dom';
import SideNav from '../../components/SideNav';
import { useAppSelector } from '../../redux/hooks';

export default function Dashboard() {
  const { value } = useAppSelector((state) => state.token);
  return (
    <div>
      {value ? (
        <div className="flex">
          <SideNav />
          <div className="flex-grow p-3 ms-4">
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}
