import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isOnboarded: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOnboarded(state, action) {
      state.user.isOnboarded = true;
    },
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout, setOnboarded } = authSlice.actions;

export default authSlice.reducer;