import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface BarChartProps {
  data: Array<{ name: string; value: number }>;
  title: string;
  subtitle: string;
  percentChange: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title, subtitle, percentChange }) => {
  const isPositive = !percentChange.includes('-');
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  
  return (
    <div className="bg-white p-6 rounded-md shadow-sm h-full">
      <div className="flex justify-between items-start">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
      </div>
      
      <div className="mt-3">
        <div className="flex items-baseline">
          <div className="text-4xl font-bold text-gray-900">{subtitle}</div>
          <div className={`ml-2 ${changeColor}`}>{percentChange}</div>
        </div>
        
        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#CCCCCC" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BarChart;