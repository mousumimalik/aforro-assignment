import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
  { day: 'Monday', online: 6000, offline: 8000 },
  { day: 'Tuesday', online: 14000, offline: 6000 },
  { day: 'Wednesday', online: 4000, offline: 10000 },
  { day: 'Thursday', online: 10000, offline: 4000 },
  { day: 'Friday', online: 16000, offline: 12000 },
  { day: 'Saturday', online: 6000, offline: 8000 },
  { day: 'Sunday', online: 18000, offline: 6000 },
];

export default function TotalRevenue() {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Total Revenue</h3>
      <ResponsiveContainer width="100%" height={170}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barSize={8} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 9 }} />
          <YAxis tick={{ fontSize: 9 }} />
          <Tooltip />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 10 }} />
          <Bar dataKey="online" fill="#6366f1" name="Online Sales" radius={[4, 4, 0, 0]} />
          <Bar dataKey="offline" fill="#22c55e" name="Offline Sales" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
