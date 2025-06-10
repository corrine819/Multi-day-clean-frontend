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
      .then((res) => res.json())
      .then((data) => {
        setPlan(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="dashboard-quadrant">
      <h2 className="text-xl font-semibold mb-2">🏋️ Workout Generator</h2>
      <div className="space-y-2">
        <div>
          <label>Goal:</label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
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
            onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
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
            onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Equipment:</label>
          <input
            type="text"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Fitness Level:</label>
          <input
            type="text"
            value={fitnessLevel}
            onChange={(e) => setFitnessLevel(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Injuries/Restrictions:</label>
          <input
            type="text"
            value={injuries}
            onChange={(e) => setInjuries(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          onClick={handleGeneratePlan}
          className="mt-2 px-4 py-2 bg-[var(--accent-color)] text-white rounded hover:opacity-90 transition"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>

        {plan && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Generated Plan:</h3>
            <pre className="p-2 bg-surface rounded text-sm overflow-x-auto">
              {JSON.stringify(plan, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutGenerator;
