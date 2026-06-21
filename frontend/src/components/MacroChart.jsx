import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MacroChart({ totals, limits }) {
  // Format the data for Recharts
  const data = [
    { name: 'Protein (g)', Current: totals.protein, Target: limits.protein },
    { name: 'Carbs (g)', Current: totals.carbs, Target: limits.carbs },
    { name: 'Fats (g)', Current: totals.fats, Target: limits.fats },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Macro Analysis</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" tick={{fill: '#6b7280', fontSize: 14}} axisLine={false} tickLine={false} />
            <YAxis tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
            <Tooltip 
              cursor={{ fill: '#f9fafb' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar dataKey="Current" fill="#3b82f6" radius={[6, 6, 0, 0]} animationDuration={1000} />
            <Bar dataKey="Target" fill="#e5e7eb" radius={[6, 6, 0, 0]} animationDuration={1000} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}