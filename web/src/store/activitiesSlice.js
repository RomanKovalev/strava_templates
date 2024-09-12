import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activities: [],
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    setActivities(state, action) {
      state.activities = action.payload;
    },
  },
});

export const { setActivities } = activitiesSlice.actions;

export default activitiesSlice.reducer;
