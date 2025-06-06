import React, { useEffect, useState } from 'react';
import WorkoutGenerator from './WorkoutGenerator'; // Import your WorkoutGenerator

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/get_profile`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error('Error fetching profile:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>

      {profile ? (
        <div>
          <h2>Welcome, {profile.name || 'User'}!</h2>
          <p>Goal: {profile.goal || 'N/A'}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      {/* Embed the full Workout Generator here */}
      <div style={{ marginTop: '2rem' }}>
        <WorkoutGenerator />
      </div>
    </div>
  );
};

export default Dashboard;
