import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

const EQUIPMENT_OPTIONS = [
  'Dumbbells', 'Barbell', 'Kettlebell', 'Resistance Bands', 'TRX', 'Medicine Ball', 'Pull-up Bar', 'Yoga Mat', 'None'
];

const INJURY_OPTIONS = [
  'Shoulder', 'Back', 'Knee', 'Ankle', 'Hip', 'Wrist', 'Other'
];

const WorkoutGenerator = () => {
  const [goal, setGoal] = useState('');
  const [energyLevel, setEnergyLevel] = useState(5);
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [equipment, setEquipment] = useState('');
  const [injuries, setInjuries] = useState('');
  const [injuryNote, setInjuryNote] = useState('');
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
        injuries: injuryNote ? `${injuries} - ${injuryNote}` : injuries,
        energy_level: energyLevel
      };

      const response = await fetch(`${API_URL}/generate_multi_day_plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    <div className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow space-y-6">
      <Toaster position="top-center" />
      <h2 className="text-2xl font-bold mb-4">🏋️‍♂️ Workout Plan Generator</h2>

      {/* Line 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label>Goal:</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full p-2 border rounded"
            style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
          >
            <option value="">Select Goal</option>
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="flexibility">Flexibility</option>
            <option value="performance">Performance</option>
          </select>
        </div>

        <div>
          <label>Energy Level: {energyLevel} {energyEmojis[energyLevel - 1]}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: 'var(--accent-color)' }}
          />
        </div>

        <div>
          <label>Workout Days Per Week:</label>
          <input
            type="number"
            value={daysPerWeek}
            onChange={(e) => setDaysPerWeek(Number(e.target.value))}
            className="w-full p-2 border rounded"
            style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
          />
        </div>
      </div>

      {/* Line 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Upload Equipment Photo (optional):</label>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="w-full p-2 rounded" />
        </div>

        <div>
          <label>Workout Equipment:</label>
          <select
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            className="w-full p-2 border rounded"
            style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
          >
            <option value="">Select Equipment</option>
            {EQUIPMENT_OPTIONS.map((eq) => (
              <option key={eq} value={eq}>{eq}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Line 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Injuries / Restrictions:</label>
          <select
            value={injuries}
            onChange={(e) => setInjuries(e.target.value)}
            className="w-full p-2 border rounded"
            style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
          >
            <option value="">Select Injury</option>
            {INJURY_OPTIONS.map((inj) => (
              <option key={inj} value={inj}>{inj}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Additional Notes (optional):</label>
          <input
            type="text"
            value={injuryNote}
            onChange={(e) => setInjuryNote(e.target.value)}
            className="w-full p-2 border rounded"
            style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
          />
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGeneratePlan}
        disabled={loading}
        className="bg-[var(--accent-color)] text-white px-4 py-2 rounded hover:opacity-90 transition"
      >
        {loading ? 'Generating...' : 'Generate Plan'}
      </button>

      {/* Plan display */}
      {plan && (
        <div className="mt-6 space-y-4">
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
