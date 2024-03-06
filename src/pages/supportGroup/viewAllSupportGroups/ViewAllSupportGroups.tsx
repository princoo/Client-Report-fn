import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { useSupportGroups } from '../redux/hooks';
import { useEffect } from 'react';
import Loader from '../../../components/pageLoader/loader';
import { useAppSelector } from '../../../redux/hooks';
import { isMentor, isOwner } from '../../../utils/user';
import EmptyData from '../../../components/EmptyData';
import PageNotFound from '../../../components/PageNotFound';

export default function ViewAllSupportGroups() {
  const { fetchSupportGroups, loading, error, supportGroups } = useSupportGroups();
  const token = useAppSelector((state) => state.token);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '6', 10);

  useEffect(() => {
    fetchSupportGroups(page, pageSize);
  }, []);

  if (error) {
    return <PageNotFound error={error} />;
  }
  return (
    <div>
      <div className="header px-3 py-1 rounded-xl flex justify-between flex-col sm:flex-row gap-5 sm:gap-0">
        <div className="title flex flex-col items-start">
          <FontAwesomeIcon icon="group-arrows-rotate" className="text-4xl text-blue-600 mb-2" />
          <h1 className="text-3xl font-bold text-blue-600 tracking-wider">SupportGroups</h1>
          <span className="text-sm">Encouragement, Comfort, and Advice</span>
        </div>
        {!isMentor(token.value) && (
          <div className="self-start md:self-start">
            <Link
              to="/supportgroup/add"
              className="bg-blue-500 py-2 px-4 rounded-lg text-sm text-white cursor:pointer"
            >
              <FontAwesomeIcon icon="add" className="me-2" />
              New
            </Link>
          </div>
        )}
      </div>
      <div className="">
        {!loading && supportGroups.length !== 0 ? (
          <ul className="grid gap-x-8 gap-y-10 mt-16 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {supportGroups.map((items, key) => (
              <li
                className="w-full mx-auto group sm:max-w-sm shadow-lg hover:shadow-sm transition-all duration:300  rounded-md"
                key={key}
              >
                <Link to={`/supportgroup/${items.id}`}>
                  <img
                    src={items.SGroupImages[0].url}
                    loading="lazy"
                    alt={items.id}
                    className="w-full rounded-t-md object-cover h-48"
                  />
                  <div className="mt-3 space-y-2 p-2">
                    {!isOwner(items.UserId, token.value) && (
                      <span className="block text-gray-900">
                        {items.User.firstName + items.User.lastName}
                      </span>
                    )}
                    <span className="block text-blue-500 text-sm">{items.date}</span>
                    <h3 className="text-lg text-gray-800 duration-150 group-hover:text-blue-500 font-medium break-words line-clamp-2">
                      {items.title}
                    </h3>
                    <p className="text-gray-600 duration-150 group-hover:text-gray-800 break-words line-clamp-3">
                      {items.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <EmptyData items="Support Groups" />
        )}
      </div>
      {loading && <Loader />}
    </div>
  );
}
