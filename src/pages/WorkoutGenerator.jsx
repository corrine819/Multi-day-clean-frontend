import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

const WorkoutGenerator = ({ accentColor = '#4A90E2' }) => {
  const [goal, setGoal] = useState('');
  const [energyLevel, setEnergyLevel] = useState(5);
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [equipment, setEquipment] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [injuries, setInjuries] = useState('');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [equipmentPhoto, setEquipmentPhoto] = useState(null);

  const energyEmojis = ['💤','😴','😕','😐','🙂','😊','😃','😄','😁','🎉'];

  const handleGeneratePlan = async () => {
    setLoading(true);
    setPlan(null);

    try {
      const payload = {
        days: daysPerWeek,
        goal,
        equipment,
        fitness_level: fitnessLevel,
        injuries,
        energy_level: energyLevel
      };

      const response = await fetch(`${API_URL}/generate_multi_day_plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      setPlan(data.plan);
      toast.success('Workout plan generated!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate workout plan');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    setEquipmentPhoto(file);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${API_URL}/detect_equipment`, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      setEquipment(result.equipment.join(', '));
      toast.success('Equipment detected!');
    } catch (err) {
      toast.error('Failed to recognize equipment.');
      console.error(err);
    }
  };

  return (
    <div className="p-4 space-y-4 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-md">
      <Toaster position="top-center" />
      <h2 className="text-xl font-bold">🎯 Generate Your Workout Plan</h2>

      <div className="space-y-2">
        <label>Goal:</label>
        <select
          className="w-full p-2 rounded border"
          style={{ borderColor: accentColor, color: accentColor }}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          <option value="">Select Goal</option>
          <option value="weight_loss">Weight Loss</option>
          <option value="muscle_gain">Muscle Gain</option>
          <option value="flexibility">Flexibility</option>
          <option value="performance">Performance</option>
        </select>

        <label>Energy Level: {energyLevel} {energyEmojis[energyLevel - 1]}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={energyLevel}
          onChange={(e) => setEnergyLevel(Number(e.target.value))}
          className="w-full"
          style={{ accentColor }}
        />

        <label>Days per Week:</label>
        <input
          type="number"
          value={daysPerWeek}
          onChange={(e) => setDaysPerWeek(Number(e.target.value))}
          className="w-full p-2 rounded border"
          style={{ borderColor: accentColor, color: accentColor }}
        />

        <label>Upload Equipment Photo (optional):</label>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="w-full p-2 rounded" />

        <label>Detected/Available Equipment:</label>
        <input
          type="text"
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
          className="w-full p-2 rounded border"
          style={{ borderColor: accentColor, color: accentColor }}
        />

        <label>Fitness Level:</label>
        <select
          value={fitnessLevel}
          onChange={(e) => setFitnessLevel(e.target.value)}
          className="w-full p-2 rounded border"
          style={{ borderColor: accentColor, color: accentColor }}
        >
          <option value="">Select Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <label>Injuries / Restrictions:</label>
        <input
          type="text"
          value={injuries}
          onChange={(e) => setInjuries(e.target.value)}
          className="w-full p-2 rounded border"
          style={{ borderColor: accentColor, color: accentColor }}
        />

        <button
          onClick={handleGeneratePlan}
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
      </div>

      {plan && (
        <div className="mt-4 space-y-4">
          <h3 className="text-lg font-semibold">📋 Your Workout Plan:</h3>
          {plan.map((day) => (
            <div key={day.day} className="p-3 border rounded bg-gray-50 dark:bg-gray-800">
              <h4 className="font-bold mb-2">Day {day.day}</h4>
              {Object.entries(day.sections).map(([section, exercises]) => (
                <div key={section} className="mb-2">
                  <strong>{section}:</strong>
                  <ul className="list-disc ml-6">
                    {exercises.map((ex, idx) => (
                      <li key={idx}>{ex}</li>
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
