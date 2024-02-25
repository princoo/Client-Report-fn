// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import SignUp from './pages/auth/signUp/SignUp';
import Login from './pages/auth/Login/Login';
import { Provider } from 'react-redux';
import store from './redux/store';
import SideNav from './components/SideNav';

function App() {
  library.add(fab, fas);

  return (
    <div>
      <Provider store={store}>
        <NavBar />
        <SideNav />
        <Routes>
          <Route path="/auth/signup" element={<SignUp />}></Route>
          <Route path="/auth/login" element={<Login />}></Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
