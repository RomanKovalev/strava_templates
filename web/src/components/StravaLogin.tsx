import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login as loginAction } from '../store/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import { RootState } from '../store/store';
import { User } from "../types";
import { AuthStravaUrlResponse } from "../types";

const StravaLogin: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');
  const scope = queryParams.get('scope');



  const fetchStravaAuthUrl = async () => {
    try {
      const response = await api.get<AuthStravaUrlResponse>('strava/login/');
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
      try {
        dispatch(loginAction(response.data.user));
      } catch (err) {
        console.error(err);
      }
      navigate('/');
    } catch (err) {
      console.log(err.message);
    } finally {
      console.log(false);
    }
  };

  useEffect(() => {
    if (code && scope) {
      fetchToken(code, scope);
    } else {
      if (!isAuthenticated) {
        fetchStravaAuthUrl();
      }
    }
  }, [code, scope, isAuthenticated, dispatch, navigate]); // Добавляем зависимости для useEffect

  return (
    <div>
      <h2>StravaLogin</h2>
    </div>
  );
};

export default StravaLogin;
