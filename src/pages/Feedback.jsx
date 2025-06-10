import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const Feedback = () => {
  const [hydration, setHydration] = useState(5);
  const [recovery, setRecovery] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const feedbackData = {
      hydration,
      recovery,
      energy,
      notes,
    };

    fetch(`${API_URL}/submit_feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedbackData)
    })
      .then((res) => {
        if (res.ok) {
          setSubmitted(true);
        } else {
          throw new Error('Feedback submission failed.');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="dashboard-quadrant">
      <h2 className="text-xl font-semibold mb-2">📝 Feedback / Daily Journal</h2>
      <div className="space-y-2">
        <div>
          <label>Hydration: {hydration}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={hydration}
            onChange={(e) => setHydration(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label>Recovery: {recovery}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={recovery}
            onChange={(e) => setRecovery(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label>Energy: {energy}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={energy}
            onChange={(e) => setEnergy(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="3"
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-2 px-4 py-2 bg-[var(--accent-color)] text-white rounded hover:opacity-90 transition"
          disabled={submitted}
        >
          {submitted ? 'Feedback Submitted ✅' : 'Submit Feedback'}
        </button>
      </div>
    </div>
  );
};

export default Feedback;
