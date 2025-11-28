import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Circle, BookOpen } from 'lucide-react';

const SubjectDetails = ({ subject, batchName, onBack }) => {
  const [syllabus, setSyllabus] = useState([
    { id: 1, topic: 'Introduction to ' + subject, completed: true },
    { id: 2, topic: 'Core Concepts', completed: true },
    { id: 3, topic: 'Advanced Topics', completed: false },
    { id: 4, topic: 'Practical Implementation', completed: false },
    { id: 5, topic: 'Best Practices', completed: false },
    { id: 6, topic: 'Real-world Projects', completed: false },
    { id: 7, topic: 'Testing & Debugging', completed: false },
    { id: 8, topic: 'Final Assessment', completed: false }
  ]);

  const toggleCompletion = (id) => {
    setSyllabus(syllabus.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = syllabus.filter(item => item.completed).length;
  const totalCount = syllabus.length;
  const progressPercentage = ((completedCount / totalCount) * 100).toFixed(0);

  return (
    <div>
      <button onClick={onBack} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Batch Details</span>
      </button>

      <div className="card mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{subject}</h2>
            <p className="text-lg text-gray-600">{batchName}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Progress</p>
            <p className="text-3xl font-bold text-blue-600">{progressPercentage}%</p>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500" 
            style={{width: `${progressPercentage}%`}}
          ></div>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span>{completedCount} of {totalCount} topics completed</span>
          <span>{totalCount - completedCount} remaining</span>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">Syllabus</h3>
        </div>

        <div className="space-y-3">
          {syllabus.map((item, index) => (
            <div
              key={item.id}
              onClick={() => toggleCompletion(item.id)}
              className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                item.completed
                  ? 'bg-green-50 border-green-200 hover:bg-green-100'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex-shrink-0">
                {item.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <span className={`text-sm font-medium ${
                    item.completed ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    Topic {index + 1}
                  </span>
                  <span className={`text-lg font-medium ${
                    item.completed ? 'text-gray-900 line-through' : 'text-gray-900'
                  }`}>
                    {item.topic}
                  </span>
                </div>
              </div>

              <div>
                {item.completed && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card mt-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <h4 className="font-semibold text-gray-900 mb-3">Instructions</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Click on any topic to mark it as completed</li>
          <li>• Click again to mark as incomplete</li>
          <li>• Progress is automatically calculated</li>
          <li>• Green topics are completed, white topics are pending</li>
        </ul>
      </div>
    </div>
  );
};

export default SubjectDetails;
