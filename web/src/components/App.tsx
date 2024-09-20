import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Activities from './Activities';
import Login from './Login';
import Logout from './Logout';
import MainPage from './MainPage';
import OnBoarding from './OnBoarding';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import Header from './Header';
import SupportPage from "./SupportPage";
import WebSiteFooter from './WebSiteFooter';
import { useDispatch, useSelector } from 'react-redux';
import StravaLogin from './StravaLogin';
import { useEffect } from 'react';
import { login as loginAction, logout as logoutAction } from '../store/authSlice';
import api from '../api';
import { AuthResponse } from "../types";
import { RootState } from '../store/store';
import { AppDispatch } from '../store/store';

const App = () => {
  const dispatch: AppDispatch = useDispatch();

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get<AuthResponse>('check-auth/');
        if (response.data.authenticated) {
          dispatch(loginAction(response.data.user));
        } else {
          dispatch(logoutAction());
        }
      } catch (error) {
        dispatch(logoutAction());
      }
    };
    checkAuth();
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4">
        <div className="container mx-auto">
          <Routes>
            <Route
              path="/"
              element={
                !isAuthenticated ? (
                  <MainPage />
                ) : isAuthenticated && !user?.isOnboarded ? (
                  <OnBoarding />
                ) : (
                  <Dashboard />
                )
              }
            />
            <Route
              path="/activities"
              element={
                <PrivateRoute>
                  <Activities />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/strava/login" element={<StravaLogin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <WebSiteFooter />
    </div>
  );
};

export default App;
