import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    fetch(`${API_URL}/get_profile`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error('Error fetching profile:', err));
  }, []);

  // Fetch multi-day plan when button clicked
  const generatePlan = () => {
    setLoading(true);
    fetch(`${API_URL}/generate_multi_day_plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Example payload — adjust based on your backend's expected input
        goal: profile?.goal || 'general_fitness',
        days: 5
      })
    })
      .then(res => res.json())
      .then(data => {
        setPlan(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error generating plan:', err);
        setLoading(false);
      });
  };

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

      <button onClick={generatePlan} disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Generating Plan...' : 'Generate Multi-Day Plan'}
      </button>

      {plan && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Your Multi-Day Plan:</h2>
          <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
            {JSON.stringify(plan, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
