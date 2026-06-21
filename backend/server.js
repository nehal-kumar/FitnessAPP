const express = require('express');
const cors = require('cors');

// FIX: Added clearAllMeals to this import!
const { getDashboardState, setFitnessGoal, addMeal, deleteMeal, clearAllMeals } = require('./controllers/trackerLogic');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Get current state (on initial load)
app.get('/api/state', (req, res) => {
    res.json(getDashboardState());
});

// 2. Change fitness goal (Vibe Check toggle)
app.post('/api/goal', (req, res) => {
    const { goal } = req.body;
    const newState = setFitnessGoal(goal);
    res.json(newState);
});

// 3. Log a new meal or trigger mock AI upload
app.post('/api/meals', (req, res) => {
    const { name, weight, isMockUpload } = req.body;
    const newState = addMeal(name, weight, isMockUpload);
    res.json(newState);
});

// 5. Clear all meals (Reset Day) - Placed BEFORE the /:id route
app.delete('/api/meals', (req, res) => {
    const newState = clearAllMeals();
    res.json(newState);
});

// 4. Delete a meal (Trash icon)
app.delete('/api/meals/:id', (req, res) => {
    const { id } = req.params;
    const newState = deleteMeal(id);
    res.json(newState);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});