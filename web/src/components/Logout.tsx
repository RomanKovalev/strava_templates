import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await api.post('strava/logout/');
        dispatch(logoutAction());
        navigate('/');
      } catch (error) {
        console.error(`Logout failed: ${error}`);
      }
    };

    handleLogout();
  }, [dispatch, navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;
