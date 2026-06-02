import { ShoppingBag, ClipboardList, CheckCircle, Users } from 'lucide-react';

const stats = [
  {
    icon: ShoppingBag,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
    value: '$1k',
    label: 'Total Sales',
    change: '+8% from yesterday',
    changeColor: 'text-green-500',
  },
  {
    icon: ClipboardList,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    value: '300',
    label: 'Total Order',
    change: '+5% from yesterday',
    changeColor: 'text-green-500',
  },
  {
    icon: CheckCircle,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-500',
    value: '5',
    label: 'Product Sold',
    change: '+1.2% from yesterday',
    changeColor: 'text-green-500',
  },
  {
    icon: Users,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
    value: '8',
    label: 'New Customers',
    change: '0.5% from yesterday',
    changeColor: 'text-red-400',
  },
];

export default function StatsCards() {
  return (
    <>
      {stats.map(({ icon: Icon, iconBg, iconColor, value, label, change, changeColor }) => (
        <div key={label} className="bg-white rounded-xl p-4 border border-gray-100">
          <div className={`w-10 h-10 ${iconBg} rounded-full flex items-center justify-center mb-3`}>
            <Icon size={18} className={iconColor} />
          </div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-sm text-gray-500 mt-0.5">{label}</p>
          <p className={`text-xs mt-1 ${changeColor}`}>{change}</p>
        </div>
      ))}
    </>
  );
}
