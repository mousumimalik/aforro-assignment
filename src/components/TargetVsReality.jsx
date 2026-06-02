import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', reality: 8000, target: 12000 },
  { month: 'Feb', reality: 9500, target: 11000 },
  { month: 'Mar', reality: 7000, target: 13000 },
  { month: 'Apr', reality: 11000, target: 10000 },
  { month: 'May', reality: 8500, target: 12500 },
  { month: 'Jun', reality: 10000, target: 11500 },
  { month: 'Jul', reality: 9000, target: 12000 },
];

export default function TargetVsReality() {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Target vs Reality</h3>
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barSize={8} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 9 }} />
          <YAxis tick={{ fontSize: 9 }} />
          <Tooltip />
          <Bar dataKey="reality" fill="#f59e0b" name="Reality Sales" radius={[4, 4, 0, 0]} />
          <Bar dataKey="target" fill="#22c55e" name="Target Sales" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-amber-400 inline-block"></span>
          <div>
            <p className="text-xs text-gray-400">Reality Sales</p>
            <p className="text-xs font-semibold text-gray-700">8,823</p>
            <p className="text-[10px] text-gray-400">Global</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-green-400 inline-block"></span>
          <div>
            <p className="text-xs text-gray-400">Target Sales</p>
            <p className="text-xs font-semibold text-gray-700">12,122</p>
            <p className="text-[10px] text-gray-400">Commerce</p>
          </div>
        </div>
      </div>
    </div>
  );
}
