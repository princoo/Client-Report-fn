// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { clearToken } from '../redux/slices/tokenSlice';

export default function NavBar() {
  const { value } = useAppSelector((state) => state.token);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(clearToken());
    navigate('/auth/login');
  };
  return (
    <div>
      <div className="flex w-full lg:justify-between p-3 border-b-2 justify-end">
        <p className="font-medium text-lg hidden lg:block">CATS CARE</p>
        <div className="flex gap-7 text-lg items-center">
          <p className="text-sm cursor:pointer hover:bg-blue-100 px-2 py-1 rounded-lg">
            <Link to={'/'}>Home </Link>
          </p>
          {!value ? (
            <button className="bg-blue-500 rounded-lg px-2 py-1 text-white text-sm">
              <Link to={'/auth/login'}> Sign in </Link>
            </button>
          ) : (
            <>
              {/* <FontAwesomeIcon icon="bell" /> */}
              <button
                className="text-sm hover:bg-blue-100 px-2 py-1 rounded-lg"
                onClick={handleLogOut}
              >
                Logout
                {/* <FontAwesomeIcon icon="arrow-alt-from-left" /> */}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
