import { useState, useRef, useEffect } from 'react';

// Hardcoded keys from your mock database
const KNOWN_FOODS = ["Chicken breast", "Rice", "Broccoli", "Salmon", "Avocado Toast"];

export default function LoggingPanel({ onLogMeal }) {
  const [foodName, setFoodName] = useState('');
  const [weight, setWeight] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setFoodName(val);
    if (val.length > 0) {
      const filtered = KNOWN_FOODS.filter(f => f.toLowerCase().includes(val.toLowerCase()));
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectFood = (food) => {
    setFoodName(food);
    setShowSuggestions(false);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (foodName && weight) {
      onLogMeal(foodName, Number(weight), false);
      setFoodName('');
      setWeight('');
      setShowSuggestions(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Log a Meal</h3>
      
      <form onSubmit={handleManualSubmit} className="flex space-x-3 mb-4 items-start">
        <div className="flex-1 relative" ref={wrapperRef}>
          <input 
            type="text" 
            placeholder="Food name (e.g., Chicken breast)" 
            value={foodName}
            onChange={handleTextChange}
            onFocus={() => { if(foodName) setShowSuggestions(true); }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Autocomplete Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-20 w-full bg-white border border-gray-200 mt-1 rounded-lg shadow-lg max-h-40 overflow-y-auto">
              {suggestions.map((s, idx) => (
                <li 
                  key={idx} 
                  onClick={() => handleSelectFood(s)}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <input 
          type="number" 
          placeholder="Grams" 
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-24 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors">
          Add
        </button>
      </form>

      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-sm">Or use AI Scanner:</span>
        <button 
          type="button"
          onClick={() => onLogMeal('', 0, true)}
          className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-200 flex items-center transition-colors shadow-sm"
        >
          📷 Simulate Image Upload
        </button>
      </div>
    </div>
  );
}