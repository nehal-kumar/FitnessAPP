import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast'; // IMPORTED TOASTS
import { getState, setGoal, logMeal, deleteMeal, clearAllMeals } from './services/api';
import Dashboard from './components/Dashboard';
import LoggingPanel from './components/LoggingPanel';
import MealHistory from './components/MealHistory';
import WarningModal from './components/WarningModal';
import MacroChart from './components/MacroChart';

export default function App() {
  const [appState, setAppState] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    getState().then(setAppState);
  }, []);

  const handleSetGoal = async (goal) => {
    const newState = await setGoal(goal);
    setAppState(newState);
    toast(`Goal switched to ${goal}`, { icon: '🎯' });
  };

  const handleLogMeal = async (name, weight, isMock) => {
    const newState = await logMeal(name, weight, isMock);
    setAppState(newState);
    toast.success(isMock ? 'AI Image Scan successful!' : 'Meal logged!');
    if (newState.isOverBudget) setShowWarning(true);
  };

  const handleDelete = async (id) => {
    const newState = await deleteMeal(id);
    setAppState(newState);
    toast('Meal removed from log.', { icon: '🗑️' });
    if (!newState.isOverBudget) setShowWarning(false);
  };

  const handleClearAll = async () => {
    const newState = await clearAllMeals();
    setAppState(newState);
    toast.success('Day has been reset.');
    setShowWarning(false);
  };

  if (!appState) return <div className="flex h-screen items-center justify-center font-bold text-xl text-blue-500 animate-pulse">Loading Tracker...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
      <Toaster position="bottom-right" reverseOrder={false} /> {/* TOAST INJECTED HERE */}
      
      {/* Sleek Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <span className="text-xl leading-none block">⚡</span>
            </div>
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              FitnessAPP
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User Avatar" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-grow max-w-4xl w-full mx-auto space-y-8 mt-8 px-6 pb-12">
        
        {/* The Vibe Check */}
        <div className="flex justify-center space-x-2 bg-white p-2 rounded-xl shadow-sm border border-gray-100 w-fit mx-auto">
          {['Weight Loss', 'Maintenance', 'Muscle Gain'].map((goal) => (
            <button
              key={goal}
              onClick={() => handleSetGoal(goal)}
              className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${
                appState.currentGoal === goal 
                  ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                  : 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Dashboard totals={appState.totals} limits={appState.limits} isOverBudget={appState.isOverBudget} />
          <MacroChart totals={appState.totals} limits={appState.limits} />
        </div>
        
        <LoggingPanel onLogMeal={handleLogMeal} />
        
        <MealHistory meals={appState.meals} onDelete={handleDelete} onClearAll={handleClearAll} />

      </div>

      {/* Warning Modal Overlay */}
      {showWarning && <WarningModal onClose={() => setShowWarning(false)} />}

      {/* Premium Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="font-bold text-gray-700">FitnessAPP</span>
            <span>© 2026. Built for the Vibe Coding Assessment.</span>
          </div>
          <div className="flex space-x-6 font-medium">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}