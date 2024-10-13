import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types';

const initialState = {
  isSyncing: true,
  isAuthenticated: false,
  user: null,
};


// export const loginUserAsync = createAsyncThunk(
//   'auth/login',
//   async (user: User, { rejectWithValue }) => {
//     try {
//       // Симуляция сохранения пользователя
//       return user; // Возвращаем пользователя, чтобы он стал payload
//     } catch (err) {
//       return rejectWithValue('Login failed');
//     }
//   }
// );



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isSyncing = action.payload.isSyncing;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
