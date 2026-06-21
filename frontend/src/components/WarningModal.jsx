export default function WarningModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl max-w-sm w-full text-center shadow-xl transform animate-bounce">
        <div className="text-5xl mb-4">🚨</div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">Daily Budget Exceeded!</h2>
        <p className="text-gray-600 mb-6">You have surpassed your calorie limit for your current fitness goal.</p>
        <button 
          onClick={onClose}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 w-full"
        >
          Acknowledge
        </button>
      </div>
    </div>
  );
}