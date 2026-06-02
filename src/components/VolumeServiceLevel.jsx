import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
  { label: 'Jan', volume: 300, service: 180 },
  { label: 'Feb', volume: 450, service: 220 },
  { label: 'Mar', volume: 280, service: 150 },
  { label: 'Apr', volume: 520, service: 300 },
  { label: 'May', volume: 390, service: 200 },
  { label: 'Jun', volume: 600, service: 350 },
];

export default function VolumeServiceLevel() {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Volume vs Service Level</h3>
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barSize={10} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 9 }} />
          <YAxis tick={{ fontSize: 9 }} />
          <Tooltip />
          <Bar dataKey="volume" fill="#6366f1" name="Volume" radius={[3, 3, 0, 0]} />
          <Bar dataKey="service" fill="#22c55e" name="Services" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex gap-6 mt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1.5 rounded-full bg-indigo-500 inline-block"></span>
          <p className="text-xs text-gray-500">Volume <span className="font-semibold text-gray-700">1,135</span></p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1.5 rounded-full bg-green-500 inline-block"></span>
          <p className="text-xs text-gray-500">Services <span className="font-semibold text-gray-700">635</span></p>
        </div>
      </div>
    </div>
  );
}
