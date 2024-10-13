import { useEffect, useState } from 'react';
import api from '../api';
import { Card } from 'flowbite-react';
import CustomBrushChart from './CustomBrushChart';
import ActivityHeatmap from './ActivityHeatmap';
import StatsPerWeekday from './StatsPerWeekday';
import StatsDayTime from './StatsDayTime';
import RecentActivities from './RecentActivities';
import Summary from './Summary';
import { Link } from 'react-router-dom';
import strava_connect from '../assets/btn_strava_connectwith_orange.png'

import {
  setActivityIntencities,
  setRecentActivities,
  setStatsPerDayTime,
  setStatsPerWeekDay,
  setSummary,
  setWeeklyDistances,
  // setEnoughActivities
} from '../store/dashboardSlice';
import { DashboardData } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Dashboard = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isSyncing = useSelector((state: RootState) => state.auth.user.isSyncing);


  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get<DashboardData>('dashboard/');
        if (response.status === 204) {
          console.log("Not enough activities...");
        } else {
          dispatch(setRecentActivities(response.data.recent_activities));
          dispatch(setSummary(response.data.summary));
          dispatch(setWeeklyDistances(response.data.weekly_distances));
          dispatch(setActivityIntencities(response.data.activity_intensity));
          dispatch(setStatsPerWeekDay(response.data.activities_by_day));
          dispatch(setStatsPerDayTime(response.data.activities_by_day_time));
          console.log('Fetched data:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      }
    };

    if (isAuthenticated && !isSyncing) {
      fetchActivities();
    }
  }, [isAuthenticated, dispatch]);

  return (
    <>
      {isSyncing ? (
          <div>
            <p>Your account is not connected to Strava</p>
            <p>To connect click the button below</p>
            <Link to="#">
              <img src={strava_connect as string} alt="Sign In" />
            </Link>
            <p>After successfull connect we need some time to pull your activities for you!</p>
            <p>We will send you email after operation completing...</p>
          </div>
      ) : (
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/5 p-1" style={{ minWidth: '400px' }}>
            <Card className="h-full">
              <RecentActivities />
            </Card>
          </div>
          <div className="w-full md:w-2/5 p-1">
            <Card className="h-full flex flex-col justify-start">
              <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                Summary
              </h5>
              <Summary />
            </Card>
          </div>
        </div>
      )}
      {!isSyncing && (
        <>
          <div className="flex">
            <div className="w-full p-1">
              <Card className="h-full flex flex-col justify-start">
                <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                  Weekly distances
                </h5>
                <div className="flex-grow">
                  <CustomBrushChart />
                </div>
              </Card>
            </div>
          </div>
          <div className="flex">
            <div className="w-full p-1">
              <Card className="h-full flex flex-col justify-start">
                <div className="flex-grow">
                  <ActivityHeatmap />
                </div>
              </Card>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-1" style={{ minWidth: '400px' }}>
              <Card className="h-full">
                <StatsPerWeekday />
              </Card>
            </div>
            <div className="w-full md:w-1/2 p-0">
              <Card className="h-full">
                <StatsDayTime />
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
