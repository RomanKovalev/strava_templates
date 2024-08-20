import React, { useEffect, useState } from 'react';
import api from "../api.js";

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get('dashboard/');
        setActivities(response.data.activities);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch activities');
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h2>Dashboard Page</h2>
      <p>Welcome to the Dashboard Page!</p>
      <h3>Your Last 5 Activities:</h3>
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>
            <strong>{activity.name}</strong>: {activity.distance} meters, {activity.type}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Dashboard;
