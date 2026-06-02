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
    <DashboardCard
      title="Target vs Reality"
      footer={
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-amber-400 inline-block shrink-0" />
            <div>
              <p className="text-xs text-gray-400">Reality Sales</p>
              <p className="text-xs font-semibold text-gray-700">8,823</p>
              <p className="text-[10px] text-gray-400">Global</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block shrink-0" />
            <div>
              <p className="text-xs text-gray-400">Target Sales</p>
              <p className="text-xs font-semibold text-gray-700">12,122</p>
              <p className="text-[10px] text-gray-400">Commerce</p>
            </div>
          </div>
        </div>
      }
    >
      <div className="flex-1 min-h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barSize={8} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 9 }} />
            <YAxis tick={{ fontSize: 9 }} />
            <Tooltip />
            <Bar dataKey="reality" fill="#FFA800" name="Reality Sales" radius={[4, 4, 0, 0]} />
            <Bar dataKey="target" fill="#4AB58E" name="Target Sales" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
