import React from 'react';

const ActivityItem = ({ action, description, time, type }) => {
  const getTypeColor = (type) => {
    const colors = {
      enrollment: 'bg-blue-500',
      meeting: 'bg-purple-500',
      completion: 'bg-green-500',
      attendance: 'bg-orange-500',
      default: 'bg-gray-500'
    };
    return colors[type] || colors.default;
  };

  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
      <div className={`w-2 h-2 ${getTypeColor(type)} rounded-full mt-2 flex-shrink-0`}></div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{action}</p>
        <p className="text-sm text-gray-600 truncate">{description}</p>
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap">{time}</span>
    </div>
  );
};

export default ActivityItem;
