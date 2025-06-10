import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/theme-context';

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { theme, accentColor } = useTheme();

  useEffect(() => {
    fetch(`${API_URL}/get_profile`)
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dashboard-quadrant">
      <h2 className="text-xl font-semibold mb-2">📋 Profile Information</h2>
      {profile ? (
        <ul className="space-y-1">
          <li><strong>Name:</strong> {profile.name}</li>
          <li><strong>Goal:</strong> {profile.goal}</li>
          <li><strong>Birth Date:</strong> {profile.birth_date}</li>
          <li><strong>Gender:</strong> {profile.gender}</li>
          <li><strong>Theme:</strong> {profile.theme}</li>
          <li><strong>Accent:</strong> {profile.accent}</li>
        </ul>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
