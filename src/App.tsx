// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import SignUp from './pages/auth/signUp/SignUp';
import Login from './pages/auth/Login/Login';
import SideNav from './components/SideNav';
import { useAppSelector } from './redux/hooks';
import Reports from './pages/reports/Reports';
import SupportGroup from './pages/supportGroup/SupportGroup';
import HomeVisit from './pages/homeVisit/HomeVisit';
import WeeklyPlan from './pages/weeklyPlan/Weeklyplan';

function App() {
  library.add(fab, fas);
  const { value } = useAppSelector((state) => state.token);

  return (
    <div>
      <NavBar />
      <div className="flex">
        {value ? <SideNav /> : null}
        <div className="flex-grow p-3 ms-4">
          <Routes>
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/report/*" element={<Reports />} />
            <Route path="/supportgroup/*" element={<SupportGroup />} />
            <Route path="/homevisit/*" element={<HomeVisit />} />
            <Route path="/weeklyplan/tasks/*" element={<WeeklyPlan />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
