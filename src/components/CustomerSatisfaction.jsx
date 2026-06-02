import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', lastMonth: 3200, thisMonth: 2800 },
  { month: 'Feb', lastMonth: 2800, thisMonth: 3400 },
  { month: 'Mar', lastMonth: 3600, thisMonth: 3000 },
  { month: 'Apr', lastMonth: 2400, thisMonth: 3800 },
  { month: 'May', lastMonth: 3000, thisMonth: 4200 },
  { month: 'Jun', lastMonth: 3400, thisMonth: 4500 },
];

export default function CustomerSatisfaction() {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Customer Satisfaction</h3>
      <ResponsiveContainer width="100%" height={140}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="lastMonthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="thisMonthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          <Area type="monotone" dataKey="lastMonth" stroke="#6366f1" fill="url(#lastMonthGrad)" strokeWidth={2} name="Last Month" />
          <Area type="monotone" dataKey="thisMonth" stroke="#22c55e" fill="url(#thisMonthGrad)" strokeWidth={2} name="This Month" />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex gap-6 mt-2">
        <div>
          <p className="text-xs text-gray-400">Last Month</p>
          <p className="text-sm font-semibold text-gray-700">$3,004</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">This Month</p>
          <p className="text-sm font-semibold text-gray-700">$4,504</p>
        </div>
      </div>
    </div>
  );
}
