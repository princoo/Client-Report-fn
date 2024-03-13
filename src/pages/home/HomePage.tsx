import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

export default function Homepage() {
  const { value } = useAppSelector((state) => state.token);
  return (
    <>
      <section className="bg-gradient-to-b from-white to-blue-500 h-screen flex pt-10 md:pt-0">
        <div className="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
          <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
            <h2 className="text-4xl text-gray-800 font-extrabold md:text-5xl">
              Providing Compassionate Care for Every Patient
            </h2>
            <p>
              Explore our services, meet our dedicated team, and discover how we can support your
              journey to better health.
            </p>
            <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              {value ? (
                <Link
                  to="/client/all"
                  className="flex justify-center items-center gap-x-2 block py-2 px-4 text-center text-white font-medium bg-blue-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none"
                >
                  Resume work
                  <FontAwesomeIcon icon="building" />
                </Link>
              ) : (
                <Link
                  to="/auth/login"
                  className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border border-gray-600 rounded-lg md:inline-flex"
                >
                  Get access
                  <FontAwesomeIcon icon="arrow-right" />
                </Link>
              )}
            </div>
          </div>
          <div className="flex-none mt-14 md:mt-0 md:max-w-xl">
            <img src="/images/home.jpg" className=" md:rounded-tl-[108px]" alt="" />
          </div>
        </div>
      </section>
    </>
  );
}
