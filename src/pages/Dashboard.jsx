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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      {/* Banner/Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🏋️‍♀️ Fitness Dashboard</h1>
        <nav className="space-x-4">
          <a href="#" className="text-blue-500 hover:underline">Dashboard</a>
          <a href="#" className="text-blue-500 hover:underline">Profile</a>
          <a href="#" className="text-blue-500 hover:underline">Workout Generator</a>
          <a href="#" className="text-blue-500 hover:underline">Nutrition</a>
        </nav>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">👤 User Profile</h2>
          {profile ? (
            <ul className="space-y-1">
              <li><strong>Name:</strong> {profile.name || 'User'}</li>
              <li><strong>Goal:</strong> {profile.goal || 'N/A'}</li>
              <li><strong>Birth Date:</strong> {profile.birth_date || 'N/A'}</li>
              <li><strong>Gender:</strong> {profile.gender || 'N/A'}</li>
              <li><strong>Theme:</strong> {profile.theme || 'N/A'}</li>
              <li><strong>Accent Color:</strong> {profile.accent_color || 'N/A'}</li>
            </ul>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>

        {/* Workout Generator Panel */}
        <div className="lg:col-span-2">
          <WorkoutGenerator />
        </div>
      </div>

      {/* Additional Sections */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feedback Placeholder */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">📝 Daily Feedback</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Coming soon: hydration, recovery, and energy tracking.</p>
        </div>

        {/* Plan History Placeholder */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">📅 Plan History</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Coming soon: view and download past plans.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
