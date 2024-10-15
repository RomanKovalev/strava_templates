import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {login as loginAction, logout as logoutAction} from '../store/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import { RootState, AppDispatch } from '../store/store';
import {AuthResponse, User} from "../types";
import { AuthStravaUrlResponse } from "../types";

const StravaLogin: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isSyncing = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');
  const scope = queryParams.get('scope');


  const fetchStravaAuthUrl = async () => {
    try {
      const response = await api.get<AuthStravaUrlResponse>('strava/login/');
        console.log('response: ', response)
      if (response.data.auth_url) {
        window.location.href = response.data.auth_url;
      } else {
        console.error('auth_url is not defined in the response');
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      console.log(false);
    }
  };

  const fetchToken = async (code: string, scope: string) => {
    try {
      const response = await api.get<{ user: User }>(
        `strava/callback/?code=${encodeURIComponent(code)}&scope=${encodeURIComponent(scope)}`,
      );
      console.log(response);
      dispatch(loginAction(response.data.user));
      navigate('/');
    } catch (err) {
      console.log(err.message);
    } finally {
      console.log(false);
    }
  };

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

  useEffect(() => {
    checkAuth();
    if (code && scope) {
      fetchToken(code, scope);
    } else if (isAuthenticated && isSyncing) {
        fetchStravaAuthUrl();
      }
  }, []); //, isAuthenticated, dispatch, navigate]);

  return (
    <div>
      <h2>StravaLogin</h2>
    </div>
  );
};

export default StravaLogin;
