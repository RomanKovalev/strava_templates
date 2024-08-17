import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../auth';
import { login as loginAction } from '../store/authSlice';
import { useNavigate, useLocation  } from 'react-router-dom';
import api from "../api.js";

function StravaLogin() {
  const [stravaUrl, setstravaUrl] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const state = queryParams.get('state');
  const code = queryParams.get('code');
  const scope = queryParams.get('scope');

  const fetchStravaAuthUrl = async () => {
          try {
            const interceptors = api.interceptors.request.handlers;
            api.interceptors.request.handlers = [];
            const response = await api.get('strava/login');
            api.interceptors.request.handlers = interceptors;
            window.location.href = response.data.auth_url;
            setstravaUrl(response.data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
    };

  const fetchToken = async () => {
          try {
            const interceptors = api.interceptors.request.handlers;
            api.interceptors.request.handlers = [];
            // const response = await api.get('strava/callback/');
            const response = await api.get(`strava/callback/?code=${encodeURIComponent(code)}&scope=${encodeURIComponent(scope)}`);

            api.interceptors.request.handlers = interceptors;
            console.log(response.data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
    };

  useEffect(() => {
      if (code && scope) {
          fetchToken(code, scope)
          console.log("========================");
      } else {
        fetchStravaAuthUrl();
        console.log(stravaUrl);
      }
  }, []);

  return (
      <div>
          <h2>StravaLogin</h2>
      </div>
  );
}

export default StravaLogin;