import React, { useState } from 'react';
import { Calendar, Users, GraduationCap, Check, X, Edit2, Save } from 'lucide-react';

const AttendanceManagement = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [editingId, setEditingId] = useState(null);

  const [studentAttendance, setStudentAttendance] = useState([
    { id: 1, name: 'John Doe', batch: 'Batch A-2024', status: 'Present', date: new Date().toISOString().split('T')[0] },
    { id: 2, name: 'Sarah Wilson', batch: 'Batch B-2024', status: 'Present', date: new Date().toISOString().split('T')[0] },
    { id: 3, name: 'Mike Johnson', batch: 'Batch C-2024', status: 'Absent', date: new Date().toISOString().split('T')[0] },
    { id: 4, name: 'Emily Davis', batch: 'Batch A-2024', status: 'Present', date: new Date().toISOString().split('T')[0] }
  ]);

  const [facultyAttendance, setFacultyAttendance] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Data Science', status: 'Present', date: new Date().toISOString().split('T')[0] },
    { id: 2, name: 'Prof. Michael Chen', specialization: 'Web Development', status: 'Present', date: new Date().toISOString().split('T')[0] },
    { id: 3, name: 'Dr. Emily Davis', specialization: 'Cloud Computing', status: 'Absent', date: new Date().toISOString().split('T')[0] }
  ]);

  const handleStatusChange = (id, newStatus) => {
    if (activeTab === 'student') {
      setStudentAttendance(studentAttendance.map(s => 
        s.id === id ? { ...s, status: newStatus, date: selectedDate } : s
      ));
    } else {
      setFacultyAttendance(facultyAttendance.map(f => 
        f.id === id ? { ...f, status: newStatus, date: selectedDate } : f
      ));
    }
    setEditingId(null);
  };

  const getFilteredData = () => {
    const data = activeTab === 'student' ? studentAttendance : facultyAttendance;
    return data.filter(item => item.date === selectedDate);
  };

  const filteredData = getFilteredData();
  const presentCount = filteredData.filter(item => item.status === 'Present').length;
  const absentCount = filteredData.filter(item => item.status === 'Absent').length;
  const attendancePercentage = filteredData.length > 0 ? ((presentCount / filteredData.length) * 100).toFixed(1) : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Attendance Management</h2>
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-gray-600" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('student')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === 'student'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Student Attendance</span>
        </button>
        <button
          onClick={() => setActiveTab('faculty')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === 'faculty'
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <GraduationCap className="w-5 h-5" />
          <span>Faculty Attendance</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Present</p>
              <p className="text-3xl font-bold text-green-700">{presentCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-red-50 to-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Absent</p>
              <p className="text-3xl font-bold text-red-700">{absentCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <X className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Attendance Rate</p>
              <p className="text-3xl font-bold text-blue-700">{attendancePercentage}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                {activeTab === 'student' ? 'Batch' : 'Specialization'}
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No attendance records for {selectedDate}
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{item.name}</td>
                  <td className="py-3 px-4">{activeTab === 'student' ? item.batch : item.specialization}</td>
                  <td className="py-3 px-4">{item.date}</td>
                  <td className="py-3 px-4">
                    {editingId === item.id ? (
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                        <option value="Half Day">Half Day</option>
                      </select>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Present' ? 'bg-green-100 text-green-700' :
                        item.status === 'Absent' ? 'bg-red-100 text-red-700' :
                        item.status === 'Late' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {item.status}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {editingId === item.id ? (
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingId(item.id)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceManagement;
