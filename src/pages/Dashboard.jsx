import React from 'react';
import Profile from './Profile';
import Feedback from './Feedback';
import WorkoutPlanDisplay from './WorkoutPlanDisplay';
import WorkoutGenerator from './WorkoutGenerator';
import { ThemeSelector } from '@/components/theme-selector';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="flex justify-between items-center p-4 border-b border-border mb-4">
        <h1 className="text-2xl font-bold">🏋️ Fitness Dashboard</h1>
        <ThemeSelector />
      </header>

      <nav className="flex justify-center space-x-4 mb-4">
        <a href="#dashboard" className="hover:underline">Dashboard</a>
        <a href="#profile" className="hover:underline">Profile</a>
        <a href="#workouts" className="hover:underline">Workouts</a>
        <a href="#nutrition" className="hover:underline">Nutrition</a>
      </nav>

      <div className="dashboard-grid">
        <Profile />
        <Feedback />
        <WorkoutPlanDisplay />
        <WorkoutGenerator />
      </div>
    </div>
  );
};

export default Dashboard;
