import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import WorkoutGenerator from './pages/WorkoutGenerator';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* NavBar */}
        <nav className="flex flex-wrap justify-center md:justify-start gap-6 p-4 border-b border-gray-300 dark:border-gray-700">
          <Link to="/" className="hover:underline text-[var(--accent-color)]">Dashboard</Link>
          <Link to="/profile" className="hover:underline text-[var(--accent-color)]">Profile</Link>
          <Link to="/workout-generator" className="hover:underline text-[var(--accent-color)]">Workout Generator</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/workout-generator" element={<WorkoutGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
