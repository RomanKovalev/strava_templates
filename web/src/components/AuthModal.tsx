import React, { useState } from 'react';
import api from '../api';
import styles from './AuthModal.module.css';
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import {login as loginAction} from "../store/authSlice";

const AuthModal = ({ isLoginForm, onClose, handleLoginClick, handleSignupClick }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerUser = async (payload) => {
      try {
        const response = await api.post('/v1/register/', payload);
        return response.data;
      } catch (error) {
        console.log(error);
        setErrorMessage(error.response.data.error);
        if (error.response) {
          throw new Error(error.response.data.error || 'Registration error');
        } else {
          throw new Error('Network error.');
        }
      }
    };

const loginUser = async (payload) => {
    try {
        const response = await api.post('/v1/login/', payload);
        return response.data;
    } catch (error) {
        console.log(error);
        setErrorMessage(error.response?.data?.error || 'Login error');

        if (error.response) {
            throw new Error(error.response.data.error || 'Login error');
        } else {
            throw new Error('Network error.');
        }
    }
};
const handleLogInSubmit = async (e) => {
    e.preventDefault();
    console.log("Login submit");
    console.log("Login submit1", e.target);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
        const result = await loginUser({ email, password });
        console.log('Login successful:', result);
        dispatch(loginAction(result.user));
        navigate('/');
    } catch (error) {
        console.error('Login error:', error.message);
        setErrorMessage("Wrong email or password");
    }
};

const handleSignupSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSignupSubmit")
    if (!email || !password || !confirmPassword) {
      setErrorMessage('All fields are required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Enter correct email format');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords does not match');
      return;
    }
    setErrorMessage('');

    try {
        const result = await registerUser({
            email,
            password
        });
        console.log("result: ", result)
        dispatch(loginAction(result.user));
        navigate('/');
        console.log('Registration is successfull:', result);
    } catch (error) {
        console.error(error.message);
    }
};

    return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>

        {isLoginForm ? (
          <div className={styles.loginForm}>
            <h2>Welcome back...</h2>
            {errorMessage && <div>{errorMessage}</div>}
            <form onSubmit={handleLogInSubmit}>
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit" className={`${styles.btn} ${styles.loginBtn}`}>Log me in</button>
            </form>
            {/*<p>*/}
            {/*  <button className={styles.forgotPassword}>I&rsquo;ve forgotten my password</button>*/}
            {/*</p>*/}
            <p>
              <button className={styles.toggleBtn} onClick={handleSignupClick}>
                  Create account
              </button>
            </p>
          </div>
        ) : (
          <div className={styles.signupForm}>
          <h2>Create your free account</h2>
          {errorMessage && <div>{errorMessage}</div>}
          <form>
              <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
              <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
              <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
              <button type="submit" className={`${styles.btn} ${styles.signupBtn}`} onClick={handleSignupSubmit}>Sign me up</button>
          </form>
          <p>
            <button className={styles.toggleBtn} onClick={handleLoginClick}>
                I have an account. Log me in.
            </button>
          </p>
          </div>
        )}
      </div>
    </div>
    );
};

export default AuthModal;
