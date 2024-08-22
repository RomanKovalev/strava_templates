import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recentActivities: [],
  summary: "Since I began cycling 1 year and 6 months ago on 27-03-2023, I had 393 cycling days.\n" +
      "          I recorded a total distance of 15 595 km (0.39 trips around the world 🌍 and 0.041 trips to the\n" +
      "          moon 🌕), an elevation of 104 156 m (11.8 times Mount Everest 🏔) and a total time of 3w 1d 6h\n" +
      "          31m 🎉.\n" +
      "          That's a daily average of 31 km, a weekly average of 214 km and a monthly average of 917 km\n" +
      "          🐣.\n" +
      "          I burned 315 593 calories doing so, that's about 1 169 pizza slices 🍕.",
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