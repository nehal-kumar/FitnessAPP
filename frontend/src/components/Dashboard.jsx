export default function Dashboard({ totals, limits, isOverBudget }) {
  // Main budget color logic
  const mainBarColor = isOverBudget ? 'bg-red-600' : 'bg-blue-500';
  const calPercent = Math.min((totals.calories / limits.calories) * 100, 100);

  const renderMacroBar = (label, current, max, color) => {
    const percent = Math.min((current / max) * 100, 100);
    return (
      <div className="mt-3">
        <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
          <span>{label}</span>
          <span>{current}g / {max}g</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className={`${color} h-2 rounded-full transition-all duration-500`} style={{ width: `${percent}%` }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-4">Daily Calorie Budget</h2>
      
      {/* Main Calorie Bar */}
      <div className="mb-2 flex justify-between text-lg font-bold">
        <span>{totals.calories} kcal</span>
        <span className="text-gray-500">Target: {limits.calories} kcal</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-6 mb-6">
        <div 
          className={`${mainBarColor} h-6 rounded-full transition-all duration-500`} 
          style={{ width: `${calPercent}%` }}
        ></div>
      </div>

      {/* Macro Breakdown */}
      <div className="grid grid-cols-3 gap-4">
        {renderMacroBar('Protein', totals.protein, limits.protein, 'bg-purple-500')}
        {renderMacroBar('Carbs', totals.carbs, limits.carbs, 'bg-yellow-500')}
        {renderMacroBar('Fats', totals.fats, limits.fats, 'bg-orange-500')}
      </div>
    </div>
  );
}