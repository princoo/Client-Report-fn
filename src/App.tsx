// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import NavBar from './components/NavBar';
import SignUp from './pages/auth/signUp/SignUp';
import Login from './pages/auth/Login/Login';
import Homepage from './pages/home/HomePage';
import Dashboard from './pages/dashboard/Dashboard';
import routes from './routes';

function App() {
  library.add(fab, fas);

  return (
    <div>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/login" element={<Login />} />
          <Route element={<Dashboard />}>
            {routes.map((route, index) => {
              const { path, component: Component } = route;
              return <Route key={index} path={path} element={<Component />} />;
            })}
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
