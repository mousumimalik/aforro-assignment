import DashboardCard from './DashboardCard';

const products = [
  { rank: '01', name: 'Home Decor Range', popularity: 85, sales: '45%', barColor: 'bg-indigo-500' },
  { rank: '02', name: 'Disney Princess Pink Bag 18', popularity: 60, sales: '29%', barColor: 'bg-green-500' },
  { rank: '03', name: 'Bathroom Essentials', popularity: 50, sales: '18%', barColor: 'bg-purple-500' },
  { rank: '04', name: 'Apple Smartwatches', popularity: 35, sales: '25%', barColor: 'bg-orange-400' },
];

export default function TopProducts() {
  return (
    <DashboardCard title="Top Products">
      <div className="flex-1 flex flex-col justify-center min-h-[200px]">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-gray-100">
              <th className="text-left pb-2 font-medium">#</th>
              <th className="text-left pb-2 font-medium">Name</th>
              <th className="text-left pb-2 font-medium">Popularity</th>
              <th className="text-left pb-2 font-medium">Sales</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ rank, name, popularity, sales, barColor }) => (
              <tr key={rank} className="border-b border-gray-50 last:border-0">
                <td className="py-2.5 text-xs text-gray-400">{rank}</td>
                <td className="py-2.5 text-xs text-gray-700 font-medium">{name}</td>
                <td className="py-2.5 pr-4">
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${barColor}`}
                      style={{ width: `${popularity}%` }}
                    />
                  </div>
                </td>
                <td className="py-2.5">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full text-white ${barColor}`}>
                    {sales}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}
