import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const WorkoutPlanDisplay = () => {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/get_current_plan`)
      .then((res) => res.json())
      .then((data) => setPlan(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dashboard-quadrant">
      <h2 className="text-xl font-semibold mb-2">🏋️ Workout Plan</h2>
      {plan ? (
        <div className="space-y-2 max-h-[300px] overflow-y-auto text-sm">
          {plan.days && plan.days.map((day, index) => (
            <div key={index} className="border p-2 rounded">
              <h3 className="font-semibold mb-1">Day {index + 1}</h3>
              <ul className="list-disc list-inside">
                {day.exercises.map((exercise, idx) => (
                  <li key={idx}>{exercise}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading workout plan...</p>
      )}
    </div>
  );
};

export default WorkoutPlanDisplay;
