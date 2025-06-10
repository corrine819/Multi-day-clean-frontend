import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/theme-context';

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { accentColor } = useTheme();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/get_profile`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error('Error fetching profile:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-8 px-4">
      <div className="max-w-screen-md mx-auto p-6 rounded-lg shadow bg-surface space-y-6">
        <h1 className="text-2xl font-bold text-[var(--accent-color)]">👤 Your Profile</h1>

        {profile ? (
          <div className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Name:</strong> {profile.name}
              </div>
              <div>
                <strong>Gender:</strong> {profile.gender}
              </div>
              <div>
                <strong>Birthday:</strong> {profile.birth_date}
              </div>
              <div>
                <strong>Goal:</strong> {profile.goal}
              </div>
            </div>

            {/* Theme & Accent */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Accent Color:</strong>{' '}
                <span
                  className="inline-block w-6 h-6 rounded-full align-middle border border-gray-400"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                ></span>{' '}
                {profile.accent_color}
              </div>
              <div>
                <strong>Theme:</strong> {profile.theme}
              </div>
            </div>

            {/* Profile Picture */}
            <div>
              <strong>Profile Picture:</strong><br />
              {profile.photo_url ? (
                <img
                  src={profile.photo_url}
                  alt="Profile"
                  className="mt-2 w-32 h-32 rounded-full object-cover border-2 border-[var(--accent-color)]"
                />
              ) : (
                'No picture uploaded.'
              )}
            </div>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
