import { useEffect } from 'react';
import api from '../api';
import { Card } from 'flowbite-react';
import CustomBrushChart from './CustomBrushChart';
import ActivityHeatmap from './ActivityHeatmap';
import StatsPerWeekday from './StatsPerWeekday';
import StatsDayTime from './StatsDayTime';
import RecentActivities from './RecentActivities';
import Summary from './Summary';
import {
  setActivityIntencities,
  setRecentActivities,
  setStatsPerDayTime,
  setStatsPerWeekDay,
  setSummary,
  setWeeklyDistances,
} from '../store/dashboardSlice';
import { DashboardData } from '../types'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Dashboard = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get<DashboardData>('dashboard/');
        dispatch(setRecentActivities(response.data.recent_activities));
        dispatch(setSummary(response.data.summary));
        dispatch(setWeeklyDistances(response.data.weekly_distances));
        dispatch(setActivityIntencities(response.data.activity_intensity));
        dispatch(setStatsPerWeekDay(response.data.activities_by_day));
        dispatch(setStatsPerDayTime(response.data.activities_by_day_time));

        console.log('Fetched data:', response.data);
      } catch (error) {
        console.log(error);
        console.log(false);
      }
    };

    if (isAuthenticated) {
      fetchActivities();
    }
  }, [isAuthenticated, dispatch]);

  return (
    <>
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
  );
};

export default Dashboard;
