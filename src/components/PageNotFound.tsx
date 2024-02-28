import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="px-4 flex items-center justify-start md:px-8 bg-blue-300">
      <div className="">
        <div className="w-full  mx-auto space-y-3 text-center">
          <h3 className="text-gray-800 text-4xl font-semibold sm:text-5xl">Page not found</h3>
          <p className="text-gray-600">
            Sorry, the page you are looking for could not be found or has been removed.
          </p>
          <Link
            to="/"
            className="text-indigo-600 duration-150 hover:text-indigo-400 font-medium inline-flex items-center gap-x-1"
          >
            Go back
            <FontAwesomeIcon icon="arrow-alt-left" />
          </Link>
        </div>
      </div>
    </div>
  );
}
