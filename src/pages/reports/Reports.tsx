import { Suspense, lazy } from 'react';
import Loader from '../../components/pageLoader/loader';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import FallBackComponent from '../../components/FallBackComponent';
import { handleReset } from '../../utils/handleRefresh';

const AllReports = lazy(() => import('./viewReports/ViewAllReports'));

export default function Reports() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <ErrorBoundary FallbackComponent={FallBackComponent} onReset={handleReset}>
          <Routes>
            <Route path="/all" element={<AllReports />}></Route>
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
