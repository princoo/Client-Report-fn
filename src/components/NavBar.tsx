import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export default function NavBar() {
  const { value } = useAppSelector((state) => state.token);

  return (
    <div>
      <div className="flex w-full justify-between p-3 border-b-2">
        <p className="font-medium text-lg">CATS CARE</p>
        <div className="flex gap-7 text-lg items-center">
          <p className="text-sm cursor:pointer">
            <Link to={'/'}>Home </Link>
          </p>
          {!value ? (
            <button className="bg-blue-500 rounded-lg px-2 py-1 text-white text-sm">
              <Link to={'/auth/login'}> Sign in </Link>
            </button>
          ) : (
            <>
              <FontAwesomeIcon icon="bell" />
              <FontAwesomeIcon icon="user" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
