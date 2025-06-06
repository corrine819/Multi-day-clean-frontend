
# WorkoutGenerator Component

This component allows you to generate a personalized workout plan based on:

- Goal
- Energy Level (1-10)
- Days per week
- Available Equipment
- Fitness Level
- Injuries / Restrictions

## Usage

1. Place `WorkoutGenerator.jsx` and `WorkoutGenerator.module.css` in your component folder.

2. Import and use the component in your app:

```jsx
import WorkoutGenerator from './components/WorkoutGenerator';

function App() {
  return (
    <div>
      <WorkoutGenerator />
    </div>
  );
}

export default App;
```

3. Make sure you have `react-hot-toast` installed:

```bash
npm install react-hot-toast
```

4. Ensure your `.env` file contains:

```
VITE_API_URL=http://localhost:8000
```

Or your actual API endpoint.

## Styling

- The component uses a dedicated `WorkoutGenerator.module.css` for improved button/input styling.
- You can further customize the styles as needed.

---

Enjoy your personalized workout generator! 🚀
