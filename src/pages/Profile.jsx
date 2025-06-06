import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    birth_date: '',
    gender: '',
    goal: '',
    theme: '',
    accent_color: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/get_profile`)
      .then(res => res.json())
      .then(data => {
        setProfile({
          name: data.name || '',
          birth_date: data.birth_date || '',
          gender: data.gender || '',
          goal: data.goal || '',
          theme: data.theme || '',
          accent_color: data.accent_color || ''
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

  const handleAccentColorChange = (color) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      accent_color: color
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
        setTimeout(() => setMessage(''), 3000);
      })
      .catch(err => {
        console.error('Error updating profile:', err);
        setLoading(false);
      });
  };

  const accentColors = [
    'Forest Green',
    'Plum',
    'Coral',
    'Light Blue',
    'Turquoise',
    'Tan',
    'Slate Blue',
    'Sunset'
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
        {/* Personal Information */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ flex: '1 1 200px' }}>
            <label>Name:</label><br />
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </div>

          <div style={{ flex: '1 1 200px' }}>
            <label>Birth Date (MM/DD/YYYY):</label><br />
            <input
              type="text"
              name="birth_date"
              value={profile.birth_date}
              onChange={handleChange}
              placeholder="MM/DD/YYYY"
            />
          </div>

          <div style={{ flex: '1 1 200px' }}>
            <label>Gender:</label><br />
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={{ flex: '1 1 200px' }}>
            <label>Goal:</label><br />
            <select
              name="goal"
              value={profile.goal}
              onChange={handleChange}
            >
              <option value="">Select Goal</option>
              <option value="Weight Loss">Weight Loss</option>
              <option value="Build Muscle">Build Muscle</option>
              <option value="Rehab">Rehab</option>
              <option value="Better Health">Better Health</option>
              <option value="Prepartum">Prepartum</option>
              <option value="Postpartum">Postpartum</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Theme Mode */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Theme Mode:</label><br />
          <select
            name="theme"
            value={profile.theme}
            onChange={handleChange}
          >
            <option value="">Select Theme</option>
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
            <option value="System">System</option>
          </select>
        </div>

        {/* Accent Color */}
        <div style={{ marginBottom: '2rem' }}>
          <label>Accent Color:</label><br />
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginTop: '0.5rem'
          }}>
            {accentColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleAccentColorChange(color)}
                style={{
                  backgroundColor: color.toLowerCase().replace(' ', ''),
                  color: '#fff',
                  border: profile.accent_color === color ? '3px solid #000' : '1px solid #ccc',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                {color}
              </button>
            ))}
          </div>
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
