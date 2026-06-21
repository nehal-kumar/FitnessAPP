const foodDatabase = {
    "chicken breast": { calories: 165, protein: 31, carbs: 0, fats: 3.6 }, // values per 100g
    "rice": { calories: 130, protein: 2.7, carbs: 28, fats: 0.3 },
    "broccoli": { calories: 34, protein: 2.8, carbs: 6.6, fats: 0.4 },
    "salmon": { calories: 208, protein: 20, carbs: 0, fats: 13 }
};

// Simulated AI Image Scanner Mock Response
const mockImageUploadData = {
    name: "Avocado Toast",
    weight: 150,
    calories: 320,
    protein: 8,
    carbs: 35,
    fats: 18
};

module.exports = { foodDatabase, mockImageUploadData };