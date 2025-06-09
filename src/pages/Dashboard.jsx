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

  const accentColor = profile?.accent_color || '#228B22';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🏋️‍♀️ Fitness Dashboard</h1>
        <nav className="space-x-4">
          <a href="#" className="text-[var(--accent-color)] hover:underline">Dashboard</a>
          <a href="#" className="text-[var(--accent-color)] hover:underline">Profile</a>
          <a href="#" className="text-[var(--accent-color)] hover:underline">Workouts</a>
          <a href="#" className="text-[var(--accent-color)] hover:underline">Nutrition</a>
        </nav>
      </header>

      {/* 4 Quadrant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-6">
        
        {/* Quadrant 1: Profile Info */}
        <div
          className="p-4 rounded-lg shadow text-white"
          style={{ backgroundColor: accentColor }}
        >
          <h2 className="text-xl font-semibold mb-2">👤 Profile Information</h2>
          {profile ? (
            <ul className="space-y-1 text-sm">
              <li><strong>Name:</strong> {profile.name}</li>
              <li><strong>Goal:</strong> {profile.goal}</li>
              <li><strong>Birth Date:</strong> {profile.birth_date}</li>
              <li><strong>Gender:</strong> {profile.gender}</li>
              <li><strong>Theme:</strong> {profile.theme}</li>
              <li><strong>Accent:</strong> {profile.accent_color}</li>
              {profile.photo_url && (
                <img src={profile.photo_url} alt="Profile" className="mt-2 w-16 h-16 rounded-full object-cover border-2 border-white" />
              )}
            </ul>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>

        {/* Quadrant 2: Feedback / Daily Journal */}
        <div className="p-4 rounded-lg shadow border-2" style={{ borderColor: accentColor }}>
          <h2 className="text-xl font-semibold mb-2 text-[var(--accent-color)]">📝 Feedback / Daily Journal</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">Coming soon: hydration, recovery, and energy tracking.</p>
        </div>

        {/* Quadrant 3: Workout Plan */}
        <div className="p-4 rounded-lg shadow border-2" style={{ borderColor: accentColor }}>
          <h2 className="text-xl font-semibold mb-2 text-[var(--accent-color)]">🏋️‍♂️ Workout Plan</h2>
          <WorkoutGenerator />
        </div>

        {/* Quadrant 4: Nutrition */}
        <div className="p-4 rounded-lg shadow border-2" style={{ borderColor: accentColor }}>
          <h2 className="text-xl font-semibold mb-2 text-[var(--accent-color)]">🥗 Nutrition</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">Coming soon: meal planner, recipes, and nutrition tracking.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
