import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import BatchCard from '../components/BatchCard';
import api from '../../utils/api';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  TrendingUp,
  Award,
  DollarSign
} from 'lucide-react';

const DashboardLanding = ({ onBatchClick, onCourseClick, onFacultyClick }) => {
  const [stats, setStats] = useState(null);
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, batchesRes, coursesRes, facultyRes] = await Promise.all([
        api.get('/admin/dashboard/stats'),
        api.get('/batches'),
        api.get('/courses'),
        api.get('/admin/faculty')
      ]);

      setStats(statsRes.data.stats);
      setBatches(batchesRes.data.batches || []);
      setCourses(coursesRes.data.courses || []);
      setFaculty(facultyRes.data.faculty || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsDisplay = stats ? [
    { title: 'Total Students', value: stats.totalStudents || 0, change: '+12.5%', icon: Users, color: 'bg-gradient-to-br from-cyan-500 to-cyan-600', bgColor: 'bg-gradient-to-br from-cyan-50 to-cyan-100', trend: 'up' },
    { title: 'Faculty Members', value: stats.totalFaculty || 0, change: '+3.2%', icon: GraduationCap, color: 'bg-gradient-to-br from-emerald-500 to-emerald-600', bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100', trend: 'up' },
    { title: 'Active Courses', value: stats.totalCourses || 0, change: '+8.1%', icon: BookOpen, color: 'bg-gradient-to-br from-violet-500 to-violet-600', bgColor: 'bg-gradient-to-br from-violet-50 to-violet-100', trend: 'up' },
    { title: 'Active Batches', value: stats.totalBatches || 0, change: '+5.2%', icon: Calendar, color: 'bg-gradient-to-br from-amber-500 to-amber-600', bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100', trend: 'up' }
  ] : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-4">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Institute Overview</h2>
          <p className="text-gray-600">Comprehensive view of batches, courses, students, and faculty</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {statsDisplay.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Active Batches */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Active Batches</h3>
          {batches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {batches.slice(0, 6).map((batch) => (
                <div key={batch._id} onClick={() => onBatchClick(batch)} className="cursor-pointer">
                  <BatchCard batch={{
                    name: batch.name,
                    course: batch.course?.name || 'N/A',
                    students: batch.students?.length || 0,
                    faculty: batch.faculty?.length || 0,
                    status: batch.status,
                    progress: 50
                  }} />
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-8 text-gray-500">No active batches</div>
          )}
        </div>

        {/* Courses & Faculty Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Courses */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top Performing Courses</h3>
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <div className="space-y-4">
              {courses.length > 0 ? courses.slice(0, 4).map((course) => (
                <div key={course._id} onClick={() => onCourseClick(course)} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{course.name}</h4>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center"><Users className="w-4 h-4 mr-1" />{course.enrolledStudents || 0} students</span>
                        <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{course.batches || 0} batches</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-green-600">₹{course.fee?.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Fee</p>
                    </div>
                  </div>
                </div>
              )) : <p className="text-gray-500 text-center py-4">No courses available</p>}
            </div>
          </div>

          {/* Top Faculty */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top Faculty Members</h3>
              <GraduationCap className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-4">
              {faculty.length > 0 ? faculty.filter(f => f.status === 'active').slice(0, 4).map((member) => (
                <div key={member._id} onClick={() => onFacultyClick(member)} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">{member.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{member.name}</h4>
                        <p className="text-xs text-gray-600">{member.specialization}</p>
                        <div className="flex items-center space-x-3 mt-1 text-xs text-gray-600">
                          <span>{member.assignedCourses?.length || 0} Courses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )) : <p className="text-gray-500 text-center py-4">No faculty members</p>}
            </div>
          </div>
        </div>
    </div>
  );
};

export default DashboardLanding;
