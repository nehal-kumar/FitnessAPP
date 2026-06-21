const fs = require('fs');
const path = require('path');
const { foodDatabase, mockImageUploadData } = require('../data/mockDatabase');

const dbPath = path.join(__dirname, '../data/database.json');

// 1. Initialize persistent storage
let meals = [];
try {
    if (fs.existsSync(dbPath)) {
        const fileData = fs.readFileSync(dbPath, 'utf8');
        meals = fileData ? JSON.parse(fileData) : [];
    } else {
        fs.writeFileSync(dbPath, JSON.stringify([]));
    }
} catch (error) {
    console.error("Database initialization error:", error);
    meals = [];
}

let currentGoal = 'Maintenance';

const GOAL_LIMITS = {
    'Weight Loss': { calories: 1800, protein: 140, carbs: 150, fats: 50 },
    'Maintenance': { calories: 2200, protein: 150, carbs: 220, fats: 70 },
    'Muscle Gain': { calories: 2800, protein: 180, carbs: 300, fats: 85 }
};

// Helper to save to file
const saveDatabase = () => {
    fs.writeFileSync(dbPath, JSON.stringify(meals, null, 2));
};

const getDashboardState = () => {
    const limits = GOAL_LIMITS[currentGoal];
    const totals = meals.reduce((acc, meal) => {
        acc.calories += meal.calories;
        acc.protein += meal.protein;
        acc.carbs += meal.carbs;
        acc.fats += meal.fats;
        return acc;
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

    return { meals, currentGoal, limits, totals, isOverBudget: totals.calories > limits.calories };
};

const setFitnessGoal = (newGoal) => {
    if (GOAL_LIMITS[newGoal]) currentGoal = newGoal;
    return getDashboardState();
};

const addMeal = (name, weight, isMockUpload = false) => {
    let newMeal = {};
    if (isMockUpload) {
        newMeal = { id: Date.now().toString(), ...mockImageUploadData };
    } else {
        const foodKey = name.toLowerCase().trim();
        const base = foodDatabase[foodKey] || { calories: 100, protein: 5, carbs: 10, fats: 5 }; 
        const factor = weight / 100;
        newMeal = {
            id: Date.now().toString(),
            name,
            weight,
            calories: Math.round(base.calories * factor),
            protein: Math.round(base.protein * factor),
            carbs: Math.round(base.carbs * factor),
            fats: Math.round(base.fats * factor)
        };
    }
    meals.push(newMeal);
    saveDatabase(); // PERSIST TO FILE
    return getDashboardState();
};

const deleteMeal = (id) => {
    meals = meals.filter(meal => meal.id !== id);
    saveDatabase(); // PERSIST TO FILE
    return getDashboardState();
};

const clearAllMeals = () => {
    meals = [];
    saveDatabase(); // PERSIST TO FILE
    return getDashboardState();
};

module.exports = { getDashboardState, setFitnessGoal, addMeal, deleteMeal, clearAllMeals };