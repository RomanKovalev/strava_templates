import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../auth';
import { login as loginAction } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogin = async () => {
    try {
      const userData = await login(username, password);
      dispatch(loginAction(userData));
      navigate('/');
      alert('Login successful');
    } catch (error) {
      alert(`Login failed ${error}`);
    }
  };

  return (
      <div>
          <h2>Login</h2>
          <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
          />
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleLogin}>Login</button>
      </div>
  );
}

export default Login;