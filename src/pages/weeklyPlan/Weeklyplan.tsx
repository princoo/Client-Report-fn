import { Suspense, lazy } from 'react';
import Loader from '../../components/pageLoader/loader';
import { Route, Routes } from 'react-router-dom';
// import SingleSupportGroup from './singlePage/SingleSupportGroup';
import { ErrorBoundary } from 'react-error-boundary';
import PageNotFound from '../../components/PageNotFound';

const ViewAllTasks = lazy(() => import('./viewTasks/ViewAll'));
// const AddSupportGroup = lazy(() => import('./addSupportGroup/AddSupportGroup'));

export default function WeeklyPlan() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <ErrorBoundary FallbackComponent={PageNotFound}>
          <Routes>
            <Route path="/all" element={<ViewAllTasks />}></Route>
            {/* <Route path="/add" element={<AddSupportGroup />}></Route> */}
            {/* <Route path="/:sid" element={<SingleSupportGroup />}></Route> */}
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
