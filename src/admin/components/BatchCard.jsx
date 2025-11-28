import React from 'react';
import { Users, GraduationCap, BookOpen, Calendar } from 'lucide-react';

const BatchCard = ({ batch }) => {
  const getBatchColor = (name) => {
    const colors = {
      'A': 'from-blue-50 to-blue-100 border-blue-200',
      'B': 'from-green-50 to-green-100 border-green-200',
      'C': 'from-purple-50 to-purple-100 border-purple-200',
      'D': 'from-orange-50 to-orange-100 border-orange-200',
      'E': 'from-pink-50 to-pink-100 border-pink-200',
      'F': 'from-indigo-50 to-indigo-100 border-indigo-200'
    };
    const letter = name.match(/([A-F])$/)?.[1] || 'A';
    return colors[letter] || colors['A'];
  };

  return (
    <div className={`card hover:shadow-lg bg-gradient-to-br ${getBatchColor(batch.name)}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{batch.name}</h3>
          <p className="text-sm text-gray-600">{batch.course}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          batch.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {batch.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-blue-600" />
          <div>
            <p className="text-xs text-gray-600">Students</p>
            <p className="text-lg font-bold text-gray-900">{batch.students}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-4 h-4 text-green-600" />
          <div>
            <p className="text-xs text-gray-600">Faculty</p>
            <p className="text-lg font-bold text-gray-900">{batch.faculty}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Duration: {batch.duration}</span>
          <span className="text-gray-600">Progress: {batch.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{width: `${batch.progress}%`}}></div>
        </div>
      </div>
    </div>
  );
};

export default BatchCard;
