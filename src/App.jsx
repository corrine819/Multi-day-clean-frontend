import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import WorkoutGenerator from './pages/WorkoutGenerator';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Dashboard</Link>
        <Link to="/profile" style={{ marginRight: '1rem' }}>Profile</Link>
        <Link to="/workout-generator" style={{ marginRight: '1rem' }}>Workout Generator</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workout-generator" element={<WorkoutGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
