import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const WorkoutGenerator = () => {
  const [goal, setGoal] = useState('');
  const [energyLevel, setEnergyLevel] = useState(5);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [equipment, setEquipment] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [injuries, setInjuries] = useState('');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGeneratePlan = () => {
    setLoading(true);
    fetch(`${API_URL}/generate_multi_day_plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        goal,
        energy_level: energyLevel,
        days: daysPerWeek,
        equipment,
        fitness_level: fitnessLevel,
        injuries
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-8 px-4">
      <div className="max-w-screen-md mx-auto p-6 rounded-lg shadow bg-surface space-y-6">
        <h1 className="text-2xl font-bold text-[var(--accent-color)]">💪 Generate Your Workout Plan</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label>Goal:</label>
            <input
              type="text"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Fitness Level:</label>
            <input
              type="text"
              value={fitnessLevel}
              onChange={e => setFitnessLevel(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Energy Level: {energyLevel}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={energyLevel}
              onChange={e => setEnergyLevel(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label>Days per Week:</label>
            <input
              type="number"
              min="1"
              max="7"
              value={daysPerWeek}
              onChange={e => setDaysPerWeek(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="sm:col-span-2">
            <label>Available Equipment:</label>
            <input
              type="text"
              value={equipment}
              onChange={e => setEquipment(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="sm:col-span-2">
            <label>Injuries / Restrictions:</label>
            <input
              type="text"
              value={injuries}
              onChange={e => setInjuries(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <button
          onClick={handleGeneratePlan}
          disabled={loading}
          className="w-full bg-[var(--accent-color)] text-white font-semibold py-2 px-4 rounded hover:opacity-90 transition"
        >
          {loading ? 'Generating Plan...' : 'Generate Plan'}
        </button>

        {plan && (
          <div className="mt-6 space-y-2">
            <h2 className="text-xl font-semibold text-[var(--accent-color)]">📅 Your Plan</h2>
            <pre className="bg-gray-200 dark:bg-gray-800 p-4 rounded whitespace-pre-wrap">
              {JSON.stringify(plan, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutGenerator;
