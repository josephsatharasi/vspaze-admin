import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';

const AdminProfile = ({ onClose }) => {
  const auth = JSON.parse(localStorage.getItem('vspaze_auth') || '{}');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: auth.user?.name || 'Admin',
    email: auth.user?.email || 'admin@vspaze.com',
    phone: auth.user?.phone || '+91 9876543210',
    address: auth.user?.address || 'VSPaze Institute, Hyderabad, India',
    role: auth.user?.role || 'Super Administrator'
  });

  const handleSave = () => {
    const updatedAuth = {
      ...auth,
      user: { ...auth.user, ...profileData }
    };
    localStorage.setItem('vspaze_auth', JSON.stringify(updatedAuth));
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h3 className="text-2xl font-bold text-gray-900">Admin Profile</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-3xl font-bold">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-900">{profileData.name}</h4>
              <p className="text-gray-600">{profileData.role}</p>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-2 flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-start space-x-3">
                <User className="w-5 h-5 text-gray-400 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  ) : (
                    <p className="text-lg text-gray-900">{profileData.name}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gray-400 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  ) : (
                    <p className="text-lg text-gray-900">{profileData.email}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-400 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  ) : (
                    <p className="text-lg text-gray-900">{profileData.phone}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                  {isEditing ? (
                    <textarea
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      rows="2"
                    />
                  ) : (
                    <p className="text-lg text-gray-900">{profileData.address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
              >
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-semibold"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
