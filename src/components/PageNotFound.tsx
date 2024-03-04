import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default function PageNotFound(props: { error: string }) {
  return (
    <div className="px-4 flex items-center justify-start md:px-8">
      <div className="justify-center">
        <div className="w-full  mx-auto space-y-3 text-center">
          <h3 className="text-gray-800 text-4xl font-semibold sm:text-5xl">Page not found</h3>
          <p className="text-gray-600">Sorry, Something went wrong. Try again.</p>
          <span>{props.error}</span>
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
