
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import styles from './WorkoutGenerator.module.css';

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

  const safeNumber = (value, fallback = 5) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? fallback : parsed;
  };

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/generate_multi_day_plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goal,
          energy_level: safeNumber(energyLevel),
          days: safeNumber(daysPerWeek),
          equipment,
          fitness_level: fitnessLevel,
          injuries,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setPlan(data);
      toast.success('Workout plan generated!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate workout plan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-center" />
      <h2 className={styles.heading}>Workout Plan Generator</h2>

      <div className={styles.grid}>
        <div>
          <label className={styles.label}>Goal</label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.label}>Energy Level (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(e.target.value)}
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.label}>Days Per Week</label>
          <input
            type="number"
            min="1"
            max="7"
            value={daysPerWeek}
            onChange={(e) => setDaysPerWeek(e.target.value)}
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.label}>Available Equipment</label>
          <input
            type="text"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.label}>Fitness Level</label>
          <input
            type="text"
            value={fitnessLevel}
            onChange={(e) => setFitnessLevel(e.target.value)}
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.label}>Injuries / Restrictions</label>
          <input
            type="text"
            value={injuries}
            onChange={(e) => setInjuries(e.target.value)}
            className={styles.input}
          />
        </div>
      </div>

      <button
        onClick={handleGeneratePlan}
        disabled={loading}
        className={styles.button}
      >
        {loading ? 'Generating...' : 'Generate Plan'}
      </button>

      {plan && (
        <div className={styles.planDisplay}>
          <h3 className={styles.planHeading}>Generated Plan:</h3>
          <pre className={styles.planContent}>
            {JSON.stringify(plan, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default WorkoutGenerator;
