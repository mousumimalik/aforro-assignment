import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DashboardCard from './DashboardCard';

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
    <DashboardCard
      title="Volume vs Service Level"
      footer={
        <div className="flex gap-6 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1.5 rounded-full bg-indigo-500 inline-block" />
            <p className="text-xs text-gray-500">
              Volume <span className="font-semibold text-gray-700">1,135</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1.5 rounded-full bg-emerald-500 inline-block" />
            <p className="text-xs text-gray-500">
              Services <span className="font-semibold text-gray-700">635</span>
            </p>
          </div>
        </div>
      }
    >
      <div className="flex-1 min-h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barSize={10} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 9 }} />
            <YAxis tick={{ fontSize: 9 }} />
            <Tooltip />
            <Bar dataKey="volume" fill="#5A6ACF" name="Volume" radius={[3, 3, 0, 0]} />
            <Bar dataKey="service" fill="#4AB58E" name="Services" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
