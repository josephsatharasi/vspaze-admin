import React from 'react';
import { Plus } from 'lucide-react';

const QuickActionCard = ({ title, icon: Icon, color, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="card hover:shadow-lg hover:scale-105 transition-all duration-200 text-left group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="font-semibold text-gray-900">{title}</span>
        </div>
        <Plus className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
      </div>
    </button>
  );
};

export default QuickActionCard;
