import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../auth.js';

function Logout() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
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