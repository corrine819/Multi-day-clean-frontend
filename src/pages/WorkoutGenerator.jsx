import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

const WorkoutGenerator = () => {
  const [goal, setGoal] = useState('');
  const [energyLevel, setEnergyLevel] = useState(5);
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [equipment, setEquipment] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [injuries, setInjuries] = useState('');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGeneratePlan = async () => {
    setLoading(true);
    setError('');
    setPlan(null);

    try {
      const response = await fetch(`${API_URL}/generate_multi_day_plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          days: daysPerWeek,
          goal: goal,
          equipment: equipment,
          fitness_level: fitnessLevel,
          injuries: injuries,
          energy_level: energyLevel
        })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setPlan(data.plan);
      toast.success('Workout plan generated!');
    } catch (err) {
      console.error('Error generating plan:', err);
      setError('Failed to generate workout plan. Please try again.');
      toast.error('Failed to generate workout plan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Toaster position="top-center" />
      <h2>Workout Plan Generator</h2>

      <div>
        <label>Goal:</label>
        <select value={goal} onChange={(e) => setGoal(e.target.value)}>
          <option value="">Select Goal</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Endurance">Endurance</option>
        </select>
      </div>

      <div>
        <label>Energy Level: {energyLevel}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={energyLevel}
          onChange={(e) => setEnergyLevel(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Days Per Week:</label>
        <input
          type="number"
          value={daysPerWeek}
          min="1"
          max="7"
          onChange={(e) => setDaysPerWeek(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Equipment (comma separated):</label>
        <input
          type="text"
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
          placeholder="e.g. dumbbells, resistance bands"
        />
      </div>

      <div>
        <label>Fitness Level:</label>
        <select value={fitnessLevel} onChange={(e) => setFitnessLevel(e.target.value)}>
          <option value="">Select Fitness Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label>Injuries / Restrictions:</label>
        <input
          type="text"
          value={injuries}
          onChange={(e) => setInjuries(e.target.value)}
          placeholder="e.g. knee pain, shoulder injury"
        />
      </div>

      <button onClick={handleGeneratePlan} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Plan'}
      </button>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      {plan && (
        <div style={{ marginTop: '20px' }}>
          <h3>Your Workout Plan:</h3>
          {plan.map((day) => (
            <div key={day.day} style={{ marginBottom: '15px' }}>
              <h4>Day {day.day}</h4>
              {Object.entries(day.sections).map(([sectionName, exercises]) => (
                <div key={sectionName}>
                  <strong>{sectionName}:</strong>
                  <ul>
                    {exercises.map((exercise, index) => (
                      <li key={index}>{exercise}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutGenerator;
