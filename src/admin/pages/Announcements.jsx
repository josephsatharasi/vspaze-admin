import React, { useState, useEffect } from 'react';
import { Plus, X, Megaphone, Calendar, Trash2, Edit } from 'lucide-react';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', message: '', targetAudience: 'all' });

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = () => {
    const stored = JSON.parse(localStorage.getItem('announcements') || '[]');
    setAnnouncements(stored);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updated;
    if (editingId) {
      updated = announcements.map(a => a.id === editingId ? { ...a, ...formData } : a);
    } else {
      const newAnnouncement = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
        createdBy: 'Admin'
      };
      updated = [newAnnouncement, ...announcements];
    }
    localStorage.setItem('announcements', JSON.stringify(updated));
    setAnnouncements(updated);
    setFormData({ title: '', message: '', targetAudience: 'all' });
    setEditingId(null);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this announcement?')) {
      const updated = announcements.filter(a => a.id !== id);
      localStorage.setItem('announcements', JSON.stringify(updated));
      setAnnouncements(updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Post announcements for teachers and students</p>
        </div>
        <button
          onClick={() => {
            setFormData({ title: '', message: '', targetAudience: 'all' });
            setEditingId(null);
            setShowModal(true);
          }}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          <span>New Announcement</span>
        </button>
      </div>

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No announcements yet</p>
          </div>
        ) : (
          announcements.map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Megaphone className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">{announcement.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      announcement.targetAudience === 'all' ? 'bg-purple-100 text-purple-700' :
                      announcement.targetAudience === 'teachers' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {announcement.targetAudience === 'all' ? 'All' : 
                       announcement.targetAudience === 'teachers' ? 'Teachers' : 'Students'}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3 whitespace-pre-wrap">{announcement.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(announcement.createdAt).toLocaleString()}</span>
                    </div>
                    <span>Posted by {announcement.createdBy}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setFormData({ title: announcement.title, message: announcement.message, targetAudience: announcement.targetAudience });
                      setEditingId(announcement.id);
                      setShowModal(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(announcement.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Announcement' : 'New Announcement'}</h3>
              <button onClick={() => { setShowModal(false); setEditingId(null); }}><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Announcement title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows="6"
                  placeholder="Write your announcement here..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                <select
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="all">All (Teachers & Students)</option>
                  <option value="teachers">Teachers Only</option>
                  <option value="students">Students Only</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
                  {editingId ? 'Update' : 'Post Announcement'}
                </button>
                <button type="button" onClick={() => { setShowModal(false); setEditingId(null); }} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-semibold">
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

export default Announcements;
