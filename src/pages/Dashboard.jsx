import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [feedback, setFeedback] = useState({
    energyLevel: 5,
    workoutDifficulty: '',
    comments: ''
  });
  const [nutrition, setNutrition] = useState({
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    sugars: '',
    hydration: ''
  });
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/get_profile`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error('Error fetching profile:', err));
  }, []);

  const accentColor = profile?.accent_color || '#228B22';

  useEffect(() => {
    setPlan({
      days: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
      warmup: '5 min light cardio + dynamic stretching',
      workout: 'Full body circuit x3 rounds',
      cooldown: '5 min walk + static stretching',
      caloriesBurned: 450
    });
  }, []);

  const handleFeedbackChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleNutritionChange = (e) => {
    setNutrition({ ...nutrition, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-6 px-4">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 w-full max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">🏋️‍♀️ Fitness Dashboard</h1>
        <nav className="space-x-4">
          <a href="/" className="text-[var(--accent-color)] hover:underline">Dashboard</a>
          <a href="/profile" className="text-[var(--accent-color)] hover:underline">Profile</a>
          <a href="/workout-generator" className="text-[var(--accent-color)] hover:underline">Workout Generator</a>
          <a href="#" className="text-[var(--accent-color)] hover:underline">Nutrition</a>
        </nav>
      </header>

      {/* 4 Quadrant Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full max-w-screen-xl mx-auto">
        
        {/* Quadrant 1: Profile */}
        <div className="p-4 min-h-[300px] rounded-lg shadow bg-surface space-y-4">
          <h2 className="text-xl font-semibold text-[var(--accent-color)]">👤 Profile</h2>
          {profile ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div><strong>Name:</strong> {profile.name}</div>
                <div><strong>Gender:</strong> {profile.gender}</div>
                <div><strong>Birthday:</strong> {profile.birth_date}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div><strong>Goal:</strong> {profile.goal}</div>
                <div><strong>Accent Color:</strong> {profile.accent_color}</div>
                <div><strong>Theme:</strong> {profile.theme}</div>
              </div>
              <div>
                <strong>Profile Picture:</strong><br />
                {profile.photo_url ? (
                  <img src={profile.photo_url} alt="Profile" className="mt-2 w-24 h-24 rounded-full object-cover" />
                ) : 'No picture uploaded.'}
              </div>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>

        {/* Quadrant 2: Feedback / Journal */}
        <div className="p-4 min-h-[300px] rounded-lg shadow bg-surface space-y-4">
          <h2 className="text-xl font-semibold text-[var(--accent-color)]">📝 Feedback / Journal</h2>
          <div>
            <label>Energy Level: {feedback.energyLevel}</label>
            <input
              type="range"
              min="1"
              max="10"
              name="energyLevel"
              value={feedback.energyLevel}
              onChange={handleFeedbackChange}
              className="w-full"
            />
          </div>
          <div>
            <label>Today’s Workout:</label>
            <select
              name="workoutDifficulty"
              value={feedback.workoutDifficulty}
              onChange={handleFeedbackChange}
              className="w-full p-2 border rounded"
              style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
            >
              <option value="">Select</option>
              <option value="too_easy">Too Easy</option>
              <option value="just_right">Just Right</option>
              <option value="too_hard">Too Hard</option>
            </select>
          </div>
          <div>
            <label>Comments:</label>
            <textarea
              name="comments"
              value={feedback.comments}
              onChange={handleFeedbackChange}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>
        </div>

        {/* Quadrant 3: Workout Plan Summary */}
        <div className="p-4 min-h-[300px] rounded-lg shadow bg-surface space-y-2">
          <h2 className="text-xl font-semibold text-[var(--accent-color)]">🏋️‍♂️ Workout Plan</h2>
          {plan ? (
            <>
              <div className="flex flex-wrap gap-2 mb-2">
                {plan.days.map((day) => (
                  <div key={day} className="px-2 py-1 bg-[var(--accent-color)] text-white rounded">{day}</div>
                ))}
              </div>
              <div><strong>Warm Up:</strong> {plan.warmup}</div>
              <div><strong>Workout:</strong> {plan.workout}</div>
              <div><strong>Cooldown:</strong> {plan.cooldown}</div>
              <div><strong>Total Calories Burned:</strong> {plan.caloriesBurned}</div>
            </>
          ) : (
            <p>No workout plan yet. Generate a plan to see it here!</p>
          )}
        </div>

        {/* Quadrant 4: Nutrition Tracking */}
        <div className="p-4 min-h-[300px] rounded-lg shadow bg-surface space-y-2">
          <h2 className="text-xl font-semibold text-[var(--accent-color)]">🥗 Nutrition Tracking</h2>
          {['calories','protein','carbs','fats','sugars','hydration'].map((field) => (
            <div key={field}>
              <label className="capitalize">{field}:</label>
              <input
                type="text"
                name={field}
                value={nutrition[field]}
                onChange={handleNutritionChange}
                className="w-full p-2 border rounded"
                style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
