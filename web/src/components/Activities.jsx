import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api'

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get('activities');
        setActivities(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div>
      <h2>Activities Page</h2>
      <p>Welcome to the Activities Page!</p>
      {loading && <p>Loading activities...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
          <b>{activities.message}</b>
      </ul>
    </div>
  );
}

export default Activities;