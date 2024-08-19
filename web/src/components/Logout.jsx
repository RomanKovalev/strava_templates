import React from 'react';
import { useDispatch } from 'react-redux';
// import { logout } from '../auth.js';
import { logout as logoutAction } from '../store/authSlice';
import {useNavigate} from "react-router-dom";
import api from "../api.js";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await api.post('strava/logout/');
      alert('Logout successful');
      dispatch(logoutAction());
      navigate('/');
    } catch (error) {
      alert(`Logout failed: ${error}`);
    }
  };

  return (
    <div>
      <h2>Logout Header</h2>
      <button onClick={handleLogout}>Logout Button</button>
    </div>
  );
}

export default Logout;