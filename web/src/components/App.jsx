import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Activities from './Activities';
import Login from './Login';
import Logout from './Logout';
import NotFound from './NotFound.jsx';
import PrivateRoute from './PrivateRoute';
import Header from './Header.jsx';
import WebSiteFooter from './WebSiteFooter.jsx';
import {useDispatch, useSelector} from 'react-redux';
import StravaLogin from "./StravaLogin.jsx";
import React, { useEffect } from 'react';
import { login as loginAction } from '../store/authSlice';
import { logout as logoutAction } from '../store/authSlice';
import api from "../api.js";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()

  useEffect(() => {
    // Проверка аутентификации при загрузке страницы
    const checkAuth = async () => {
      try {
        const response = await api.get('check-auth/');
        if (response.data.authenticated) {
          dispatch(loginAction(response.data.user))
        } else {
          dispatch(logoutAction())
        }
      } catch (error) {
        dispatch(logoutAction())
      }
    };

    checkAuth();
  }, []);

  return (
      <div className="flex flex-col min-h-screen">
        <Header/>
        <main className="flex-grow p-4">
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/activities" element={<PrivateRoute><Activities/></PrivateRoute>}/>
              {/*<Route path="/activities" element={<Activities/>}/>*/}
              <Route path="/login" element={<Login/>}/>
              <Route path="/logout" element={<Logout/>}/>
              <Route path="/strava/login" element={<StravaLogin/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </main>
        <WebSiteFooter/>
      </div>
  )
}

export default App;
