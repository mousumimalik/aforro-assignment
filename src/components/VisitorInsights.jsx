import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import DashboardCard from './DashboardCard';

const data = [
  { month: 'Jan', loyal: 200, new: 140, unique: 240 },
  { month: 'Feb', loyal: 250, new: 180, unique: 280 },
  { month: 'Mar', loyal: 220, new: 200, unique: 260 },
  { month: 'Apr', loyal: 300, new: 160, unique: 310 },
  { month: 'May', loyal: 280, new: 220, unique: 290 },
  { month: 'Jun', loyal: 260, new: 340, unique: 270 },
  { month: 'Jul', loyal: 310, new: 380, unique: 320 },
  { month: 'Aug', loyal: 290, new: 320, unique: 350 },
  { month: 'Sep', loyal: 330, new: 260, unique: 340 },
  { month: 'Oct', loyal: 360, new: 240, unique: 380 },
  { month: 'Nov', loyal: 340, new: 280, unique: 360 },
  { month: 'Dec', loyal: 320, new: 300, unique: 330 },
];

export default function VisitorInsights() {
  return (
    <DashboardCard title="Visitor Insights">
      <div className="flex-1 min-h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 10, paddingTop: 8 }} />
            <Line type="monotone" dataKey="loyal" stroke="#8B5CF6" strokeWidth={2} dot={false} name="Loyal Customers" />
            <Line type="monotone" dataKey="new" stroke="#F87171" strokeWidth={2} dot={false} name="New Customers" />
            <Line type="monotone" dataKey="unique" stroke="#4ADE80" strokeWidth={2} dot={false} name="Unique Customers" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
