
import React, { useEffect, useState } from 'react';
import WorkoutGenerator from './WorkoutGenerator';

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
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Dashboard</h1>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem'
        }}
      >
        {/* Profile Info Section */}
        <div
          style={{
            flex: '1 1 300px',
            minWidth: '280px',
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#fafafa'
          }}
        >
          {profile ? (
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Welcome, {profile.name || 'User'}!</h2>
              <p><strong>Goal:</strong> {profile.goal || 'N/A'}</p>
              <p><strong>Birth Date:</strong> {profile.birth_date || 'N/A'}</p>
              <p><strong>Gender:</strong> {profile.gender || 'N/A'}</p>
              <p><strong>Theme:</strong> {profile.theme || 'N/A'}</p>
              <p><strong>Accent Color:</strong> {profile.accent_color || 'N/A'}</p>
            </div>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>

        {/* Workout Generator Section */}
        <div
          style={{
            flex: '2 1 600px',
            minWidth: '300px',
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#fafafa'
          }}
        >
          <WorkoutGenerator />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
