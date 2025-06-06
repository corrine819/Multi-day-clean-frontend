
import React from 'react';
import WorkoutGenerator from './WorkoutGenerator';

const WorkoutPage = () => {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Multi-Day Workout Plan
      </h1>
      <WorkoutGenerator />
    </main>
  );
};

export default WorkoutPage;
