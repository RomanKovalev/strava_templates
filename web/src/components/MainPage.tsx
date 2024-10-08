import styles from './MainPage.module.css';
import { Link } from 'react-router-dom';
import strava_connect from '../assets/btn_strava_connectwith_orange.png'
import SliderComponent from './SliderComponent';

const MainPage: React.FC = () => {
  return (
      <div>
        <div className={styles.cta}>
          <h2>Connect Strava and Track Your Performance</h2>
          {/*<Link to="strava/login/" className={styles.linkLogin}>*/}
          <Link to="#" className={styles.linkLogin}>
            <img src={strava_connect as string} alt="Sign In" />
          </Link>
        </div>
        <div style={{textAlign: "center", fontSize: "30px", paddingTop: "30px", paddingBottom: "30px"}}>
          <h2>
            Strava is considering the possibility of increasing the number of users for us, the website is temporarily unavailable
          </h2>
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
