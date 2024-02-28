import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import decodeToken, { DecodedToken } from '../utils/token';
import { Link } from 'react-router-dom';

export default function SideNav() {
  const [isVisible, setIsVisible] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);
  const { value } = useAppSelector((state) => state.token);
  const [user, setUser] = useState<DecodedToken>();
  useEffect(() => {
    setUser(decodeToken(value || ''));
  }, [value]);
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };
  return (
    <div>
      <div>
        <button
          onClick={toggleVisibility}
          type="button"
          className="fixed bg-gray-200 top-0 left-0 z-40 items-center px-3 py-2 mt-1 ms-3 text-sm text-black-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          {isVisible ? <FontAwesomeIcon icon="xmark" /> : <FontAwesomeIcon icon="bars-staggered" />}
        </button>
      </div>

      <aside
        id="default-sidebar"
        className={` fixed lg:static shadow-lg border-r top-13 left-0 z-40 w-64 h-screen lg:block ${isVisible ? '' : 'hidden'}`}
        ref={divRef}
      >
        <div className="transition-all duration-300 h-full px-3 py-4 overflow-y-auto  lg:bg-white bg-gray-100  flex flex-col gap-2 sm:ps-10 sm:pt-4">
          <h1 className="font-bold tracking-wider text-lg capitalize">{user?.firstName}</h1>
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-100 group"
              >
                <FontAwesomeIcon icon="file-signature" className="text-blue-500 text-xl" />
                <span className="flex-1 ms-3 whitespace-nowrap">Reports</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-100 group"
              >
                <FontAwesomeIcon icon="handshake" className="text-blue-500 text-xl" />
                <span className="flex-1 ms-3 whitespace-nowrap">Home visits</span>
              </a>
            </li>
            <li>
              <Link
                to="supportgroup/all"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-100 group"
              >
                <FontAwesomeIcon icon="group-arrows-rotate" className="text-blue-500 text-xl" />
                <span className="flex-1 ms-3 whitespace-nowrap">Support groups</span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-100 group"
              >
                <FontAwesomeIcon icon="calendar-days" className="text-blue-500 text-xl" />
                <span className="flex-1 ms-3 whitespace-nowrap">Weekly plan</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
