import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const StatCard = ({ title, value, change, icon: Icon, color, bgColor, trend }) => {
  const isPositive = trend === 'up';
  
  return (
    <div className={`card ${bgColor || ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2"><AnimatedCounter end={value} /></p>
          <div className="flex items-center space-x-1">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </span>
            <span className="text-sm text-gray-500">from last month</span>
          </div>
        </div>
        <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
