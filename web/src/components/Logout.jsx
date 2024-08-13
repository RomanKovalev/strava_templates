import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

function Logout() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h2>Logout Header</h2>
      <button onClick={handleLogout}>Logout Button</button>
    </div>
  );
}

export default Logout;