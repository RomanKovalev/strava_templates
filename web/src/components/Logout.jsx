import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../auth.js';
import { logout as logoutAction } from '../store/authSlice';
import {useNavigate} from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    dispatch(logoutAction({}));
    navigate('/');
    alert('Logged out');
  };

  return (
    <div>
      <h2>Logout Header</h2>
      <button onClick={handleLogout}>Logout Button</button>
    </div>
  );
}

export default Logout;