import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  percentChange?: string;
  currency?: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  percentChange,
  currency = '',
  className = '',
}) => {
  // Determine if change is positive or negative
  const isPositive = percentChange && !percentChange.includes('-');
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  
  return (
    <div className={`bg-white p-6 rounded-md shadow-sm ${className}`}>
      <div className="flex justify-between items-start">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
          <MoreHorizontal size={16} />
        </button>
      </div>
      
      <div className="mt-3">
        <div className="text-4xl font-bold text-gray-900">
          {currency && <span className="text-3xl">{currency}</span>}
          {value}
        </div>
        
        {percentChange && (
          <div className={`mt-1 ${changeColor}`}>
            {percentChange}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;