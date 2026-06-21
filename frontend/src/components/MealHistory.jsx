export default function MealHistory({ meals, onDelete, onClearAll }) {
  if (meals.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Daily History</h3>
        <button 
          onClick={onClearAll}
          className="text-sm text-red-600 hover:text-red-800 font-semibold"
        >
          Clear All Meals
        </button>
      </div>
      
      <div className="space-y-3">
        {meals.map((meal) => (
          <div key={meal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div>
              <p className="font-bold capitalize">{meal.name}</p>
              <p className="text-xs text-gray-500">{meal.weight}g • {meal.calories} kcal • P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fats}g</p>
            </div>
            <button 
              onClick={() => onDelete(meal.id)}
              className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
              title="Delete Meal"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}