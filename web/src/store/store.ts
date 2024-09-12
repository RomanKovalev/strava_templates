import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import dashboardReducer from './dashboardSlice';
import activitiesReducer from './activitiesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    activities: activitiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;