import React, { useState } from 'react';
import { ArrowLeft, Users, GraduationCap, Calendar, Clock, TrendingUp } from 'lucide-react';
import SubjectDetails from './SubjectDetails';

const BatchDetails = ({ batch, onBack }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  if (selectedSubject) {
    return <SubjectDetails subject={selectedSubject} batchName={batch.name} onBack={() => setSelectedSubject(null)} />;
  }
  const students = [
    { id: 1, name: 'John Doe', attendance: 92, performance: 'Excellent' },
    { id: 2, name: 'Sarah Wilson', attendance: 88, performance: 'Good' },
    { id: 3, name: 'Mike Johnson', attendance: 95, performance: 'Excellent' }
  ];

  return (
    <div>
      <button onClick={onBack} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Dashboard</span>
      </button>

      <div className="card mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{batch.name}</h2>
            <p className="text-lg text-gray-600">{batch.course?.name || batch.course}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
            batch.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
          }`}>
            {batch.status}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Students</p>
              <p className="text-2xl font-bold text-gray-900">{batch.students?.length || 0}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Faculty</p>
              <p className="text-2xl font-bold text-gray-900">{batch.faculty?.name || 'N/A'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="text-2xl font-bold text-gray-900">{batch.course?.duration || 'N/A'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Progress</p>
              <p className="text-2xl font-bold text-gray-900">{batch.progress || 0}%</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-blue-600 h-4 rounded-full transition-all" style={{width: `${batch.progress || 0}%`}}></div>
          </div>
        </div>
      </div>

      {/* Subjects Section */}
      <div className="card mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Subjects</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {batch.course?.subjects?.map((subject, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedSubject(subject)}
              className="px-4 py-3 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <p className="text-sm font-medium text-gray-900">{subject}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Enrolled Students</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Attendance</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Performance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-blue-50">
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4">{student.attendance}%</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.performance === 'Excellent' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {student.performance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
