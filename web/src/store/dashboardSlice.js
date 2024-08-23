import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recentActivities: [],
  summary: {},
  weeklyDistances: [],
  activityIntencities: [],
  statsPerWeekDay: [],
  statsPerDayTime: [],
  distanceBreakdown: [],
  triviaStats: []
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setRecentActivities: (state, action) => {
      state.recentActivities = action.payload;
    },
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    setWeeklyDistances: (state, action) => {
      state.weeklyDistances = action.payload;
    },
    setActivityIntencities: (state, action) => {
      state.activityIntencities = action.payload;
    },
    setStatsPerWeekDay: (state, action) => {
      state.statsPerWeekDay = action.payload;
    },
    setStatsPerDayTime: (state, action) => {
      state.statsPerDayTime = action.payload;
    },
    setDistanceBreakdown: (state, action) => {
      state.distanceBreakdown = action.payload;
    },
    setTriviaStats: (state, action) => {
      state.triviaStats = action.payload;
    },
  },
});

export const {
  setRecentActivities,
  setSummary,
  setWeeklyDistances,
  setActivityIntencities,
  setStatsPerWeekDay,
  setStatsPerDayTime,
  setDistanceBreakdown,
  setTriviaStats
} = dashboardSlice.actions;

export default dashboardSlice.reducer;  