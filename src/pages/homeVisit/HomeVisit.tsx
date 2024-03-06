import { Suspense, lazy } from 'react';
import Loader from '../../components/pageLoader/loader';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
// import PageNotFound from '../../components/PageNotFound';
import FallBackComponent from '../../components/FallBackComponent';

const ViewAllHomeVisits = lazy(() => import('./viewAllHomeVisits/ViewAll'));
// const AddSupportGroup = lazy(() => import('./addSupportGroup/AddSupportGroup'));

export default function HomeVisit() {
  const handleReset = () => {
    // Perform any actions needed to reset state or recover from the error
    // For example, you might navigate the user to a different page or reload the current page
    window.location.reload(); // Example: Reload the current page
  };
  return (
    <div>
      <Suspense fallback={<Loader />}>
        {/* <ErrorBoundary FallbackComponent={PageNotFound} onReset={handleReset}> */}
        <ErrorBoundary FallbackComponent={FallBackComponent} onReset={handleReset}>
          <Routes>
            <Route path="/all" element={<ViewAllHomeVisits />}></Route>
            {/* <Route path="/add" element={<AddSupportGroup />}></Route>
            <Route path="/:sid" element={<SingleSupportGroup />}></Route> */}
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
