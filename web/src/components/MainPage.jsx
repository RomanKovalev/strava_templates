import React from 'react';
import styles from './MainPage.module.css';
import { Link } from "react-router-dom";


import SliderComponent from "./SliderComponent.jsx";

// install Swiper modules

const MainPage = () => {
    return (
        <div>
            <div className={styles.cta}>
                <h2>Connect Strava and Track Your Performance</h2>
                <Link to='strava/login/' className={styles.linkLogin}>
                    Connect Strava
                </Link>
            </div>

            <div className={styles.features}>
                <div className={styles.feature}>
                    <h3>Sync with Strava</h3>
                    <p>Automatically gather data from your Strava account and keep track of all your workout statistics in one place.</p>
                </div>
                <div className={styles.feature}>
                    <h3>Personalized Reports</h3>
                    <p>Get customized reports and analytics based on your goals and preferences.</p>
                </div>
                <div className={styles.feature}>
                    <h3>Real-Time Analysis</h3>
                    <p>Monitor your progress and improve your results with real-time data analysis.</p>
                </div>
            </div>

            <SliderComponent />
        </div>
    );
}

export default MainPage;
