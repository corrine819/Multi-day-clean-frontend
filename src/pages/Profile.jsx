import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    goal: '',
    hydration: 0,
    recovery: 0
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch profile on mount
  useEffect(() => {
    fetch(`${API_URL}/get_profile`)
      .then(res => res.json())
      .then(data => {
        setProfile({
          name: data.name || '',
          goal: data.goal || '',
          hydration: data.hydration || 0,
          recovery: data.recovery || 0
        });
      })
      .catch(err => console.error('Error fetching profile:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${API_URL}/update_profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    })
      .then(res => res.json())
      .then(() => {
        setMessage('Profile updated successfully!');
        setLoading(false);
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 sec
      })
      .catch(err => {
        console.error('Error updating profile:', err);
        setLoading(false);
      });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Goal:</label><br />
          <input
            type="text"
            name="goal"
            value={profile.goal}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Hydration:</label><br />
          <input
            type="number"
            name="hydration"
            value={profile.hydration}
            onChange={handleChange}
            min="0"
            max="100"
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Recovery:</label><br />
          <input
            type="number"
            name="recovery"
            value={profile.recovery}
            onChange={handleChange}
            min="0"
            max="100"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>

      {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
    </div>
  );
};

export default Profile;
