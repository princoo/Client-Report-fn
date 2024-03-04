// useLocationParams.ts
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface LocationParams {
  page: number;
  pageSize: number;
  // add other parameters here
}

const useLocationParams = (): LocationParams => {
  const location = useLocation();
  const [params, setParams] = useState<LocationParams>({ page: 1, pageSize: 6 });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '6', 10);
    // parse other parameters as needed
    setParams({ page, pageSize });
  }, []);

  return params;
};

export default useLocationParams;
