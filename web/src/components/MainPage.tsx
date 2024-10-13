import { useState } from "react";
import styles from './MainPage.module.css';
import { Link } from 'react-router-dom';
import strava_connect from '../assets/btn_strava_connectwith_orange.png'
import SliderComponent from './SliderComponent';
import AuthModal from './AuthModal';
const MainPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleLoginClick = () => {
    setIsLoginForm(true);
    setIsModalOpen(true);
  };

  const handleSignupClick = () => {
    setIsLoginForm(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSignUpModal = () => {
    setIsModalOpen(true);
    setIsLoginForm(false);
  }

  const openLoginModal = () => {
    setIsModalOpen(true);
  };

  return (
      <div>
        {isModalOpen && (
        <AuthModal
          isLoginForm={isLoginForm}
          onClose={closeModal}
          handleLoginClick={handleLoginClick}
          handleSignupClick={handleSignupClick}
        />
      )}
        <div className={styles.cta}>
          <h2>Connect Strava and Track Your Performance</h2>
          <div>
            <Link to="" className={styles.linkButton} onClick={openLoginModal}>
              Login
            </Link>
            <Link to="" className={styles.linkButton} onClick={openSignUpModal}>
              Create Account
            </Link>
          </div>
        </div>
        <div className={styles.features}>
          <div className={styles.feature}>
            <h3>Sync with Strava</h3>
            <p>
              Automatically gather data from your Strava account and keep track of
              all your workout statistics in one place.
            </p>
          </div>
          <div className={styles.feature}>
            <h3>Personalized Reports</h3>
            <p>
              Get customized reports and analytics based on your goals and
              preferences.
            </p>
          </div>
          <div className={styles.feature}>
            <h3>Real-Time Analysis</h3>
            <p>
              Monitor your progress and improve your results with real-time data
              analysis.
            </p>
          </div>
        </div>
        <SliderComponent/>
      </div>
  );
};

export default MainPage;
