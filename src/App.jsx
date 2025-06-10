import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/theme-context';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Feedback from './pages/Feedback';
import WorkoutPlanDisplay from './pages/WorkoutPlanDisplay';
import WorkoutGenerator from './pages/WorkoutGenerator';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/workout-plan" element={<WorkoutPlanDisplay />} />
          <Route path="/workout-generator" element={<WorkoutGenerator />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
