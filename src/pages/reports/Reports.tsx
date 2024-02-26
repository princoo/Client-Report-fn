import { Suspense, lazy } from 'react';
import Loader from '../../components/pageLoader/loader';
import { Route, Routes } from 'react-router-dom';

const AllReports = lazy(() => import('./viewReports/ViewAllReports'));

export default function Reports() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/all" element={<AllReports />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}
