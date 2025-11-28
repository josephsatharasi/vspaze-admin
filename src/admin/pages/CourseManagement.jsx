import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Video } from 'lucide-react';
import api from '../../utils/api';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoForm, setVideoForm] = useState({ title: '', url: '', module: '' });
  const [courseVideos, setCourseVideos] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseVideos = async (courseId) => {
    try {
      const response = await api.get(`/admin/courses/${courseId}/videos`);
      setCourseVideos(response.data.videos || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setCourseVideos([]);
    }
  };

  const handleCourseClick = async (course) => {
    setSelectedCourse(course);
    await fetchCourseVideos(course._id);
  };

  const handleAddVideo = async () => {
    if (!videoForm.title || !videoForm.url || !videoForm.module) {
      alert('Please fill all fields');
      return;
    }
    try {
      await api.post(`/admin/courses/${selectedCourse._id}/videos`, videoForm);
      await fetchCourseVideos(selectedCourse._id);
      setShowVideoModal(false);
      setVideoForm({ title: '', url: '', module: '' });
      alert('Video added successfully!');
    } catch (error) {
      alert('Failed to add video');
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm('Delete this video?')) return;
    try {
      await api.delete(`/admin/courses/${selectedCourse._id}/videos/${videoId}`);
      await fetchCourseVideos(selectedCourse._id);
    } catch (error) {
      alert('Failed to delete video');
    }
  };
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', description: '', duration: '', fee: 0, status: 'active' });

  const handleAdd = () => {
    setEditingCourse(null);
    setFormData({ name: '', description: '', duration: '', fee: 0, status: 'active' });
    setShowModal(true);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData(course);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/courses/${id}`);
        setCourses(courses.filter(c => c._id !== id));
      } catch (error) {
        alert('Failed to delete course');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        const response = await api.put(`/courses/${editingCourse._id}`, formData);
        setCourses(courses.map(c => c._id === editingCourse._id ? response.data.course : c));
      } else {
        const response = await api.post('/courses', formData);
        setCourses([...courses, response.data.course]);
      }
      setShowModal(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Operation failed');
    }
  };

  const filteredCourses = courses.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="text-xl text-gray-600">Loading courses...</div></div>;
  }

  if (selectedCourse) {
    return (
      <div>
        <button onClick={() => setSelectedCourse(null)} className="mb-4 text-purple-600 hover:text-purple-700 font-semibold">
          ← Back to Courses
        </button>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.name}</h2>
            <p className="text-gray-600 mt-1">Manage course videos</p>
          </div>
          <button
            onClick={() => setShowVideoModal(true)}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-5 h-5" />
            <span>Add Video</span>
          </button>
        </div>

        {courseVideos.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No videos added yet</p>
            <button
              onClick={() => setShowVideoModal(true)}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              Add First Video
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {courseVideos.map((video) => (
              <div key={video._id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Video className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{video.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">Module: {video.module}</p>
                      <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-600 hover:underline mt-1 inline-block">
                        {video.url}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteVideo(video._id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showVideoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">Add Video Lesson</h3>
                <button onClick={() => setShowVideoModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
                  <input
                    type="text"
                    value={videoForm.title}
                    onChange={(e) => setVideoForm({...videoForm, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="e.g., Introduction to React Hooks"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
                  <input
                    type="url"
                    value={videoForm.url}
                    onChange={(e) => setVideoForm({...videoForm, url: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Module Name</label>
                  <input
                    type="text"
                    value={videoForm.module}
                    onChange={(e) => setVideoForm({...videoForm, module: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="e.g., Module 1: Basics"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddVideo}
                    className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 font-semibold"
                  >
                    Add Video
                  </button>
                  <button
                    onClick={() => setShowVideoModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
        <button onClick={handleAdd} className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
          <Plus className="w-5 h-5" />
          <span>Add Course</span>
        </button>
      </div>

      <div className="card mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course._id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{course.name}</h3>
                <p className="text-sm text-gray-600">{course.duration}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                course.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {course.status}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fee:</span>
                <span className="font-semibold text-gray-900">₹{course.fee?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Students:</span>
                <span className="font-semibold text-gray-900">{course.enrolledStudents || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Batches:</span>
                <span className="font-semibold text-gray-900">{course.batches || 0}</span>
              </div>
            </div>
            <div className="flex space-x-2 pt-4 border-t">
              <button onClick={() => handleEdit(course)} className="flex-1 flex items-center justify-center space-x-1 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button onClick={() => handleCourseClick(course)} className="flex-1 flex items-center justify-center space-x-1 py-2 text-purple-600 hover:bg-purple-50 rounded-lg">
                <Video className="w-4 h-4" />
                <span>Videos</span>
              </button>
              <button onClick={() => handleDelete(course._id)} className="flex-1 flex items-center justify-center space-x-1 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{editingCourse ? 'Edit Course' : 'Add Course'}</h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <input
                type="text"
                placeholder="Course Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
              <textarea
                placeholder="Course Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                rows="3"
                required
              />
              <input
                type="text"
                placeholder="Duration (e.g., 6 months)"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
              <input
                type="number"
                placeholder="Fee"
                value={formData.fee}
                onChange={(e) => setFormData({...formData, fee: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="flex space-x-2">
                <button type="submit" className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                  {editingCourse ? 'Update' : 'Add'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
