import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      api.post('strava/logout/');
      dispatch(logoutAction());
      navigate('/');
    } catch (error) {
      console.log(`Logout failed: ${error}`);
    }
  });

  return (
    <div>
      <h2>Logout</h2>
    </div>
  );
}

export default Logout;
