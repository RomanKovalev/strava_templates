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
import React, {useEffect, useState} from 'react';
import { login as loginAction } from '../store/authSlice';
import { logout as logoutAction } from '../store/authSlice';
import {setActivityIntencities, setRecentActivities, setSummary, setWeeklyDistances} from '../store/dashboardSlice.js'
import api from "../api.js";

const App = () => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get('dashboard/');
        dispatch(setRecentActivities(response.data.recent_activities));
        dispatch(setSummary(response.data.summary));
        dispatch(setWeeklyDistances(response.data.weekly_distances));
        dispatch(setActivityIntencities(response.data.activity_intensity));

        setLoading(false);

        console.log('Fetched data:', response.data);
      } catch (error) {
        setError('Failed to fetch activities');
        setLoading(false);
      }
    };

    fetchActivities();
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
