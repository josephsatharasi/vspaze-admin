import React, { useState } from 'react';
import { Bell, DollarSign, UserPlus, AlertTriangle, Calendar, CheckCircle, X } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'payment', title: 'Payment Received', message: 'John Doe paid ₹30,000 for Full Stack Development', time: '5 min ago', read: false },
    { id: 2, type: 'attendance', title: 'Low Attendance Alert', message: 'Mike Johnson attendance dropped to 68% - Below minimum requirement', time: '15 min ago', read: false },
    { id: 3, type: 'student', title: 'New Student Enrolled', message: 'Sarah Wilson enrolled in Data Science & AI - Batch B-2024', time: '1 hour ago', read: false },
    { id: 4, type: 'faculty', title: 'New Faculty Added', message: 'Dr. Robert Smith joined as Cloud Computing instructor', time: '2 hours ago', read: true },
    { id: 5, type: 'leave', title: 'Leave Request', message: 'Prof. Michael Chen requested leave for 3 days (Jan 15-17)', time: '3 hours ago', read: false },
    { id: 6, type: 'payment', title: 'Payment Due', message: 'Emily Davis has pending payment of ₹15,000 - Due in 2 days', time: '5 hours ago', read: true },
    { id: 7, type: 'student', title: 'Student Completed Course', message: 'Alex Kumar completed Mobile App Development with 92% score', time: '1 day ago', read: true },
    { id: 8, type: 'attendance', title: 'Perfect Attendance', message: 'Batch A-2024 achieved 100% attendance today', time: '1 day ago', read: true },
    { id: 9, type: 'leave', title: 'Leave Approved', message: 'Dr. Emily Davis leave request approved for Jan 20-22', time: '2 days ago', read: true },
    { id: 10, type: 'payment', title: 'Payment Overdue', message: 'Tom Wilson payment overdue by 5 days - ₹25,000 pending', time: '2 days ago', read: false }
  ]);

  const [filter, setFilter] = useState('all');

  const getIcon = (type) => {
    switch(type) {
      case 'payment': return DollarSign;
      case 'attendance': return AlertTriangle;
      case 'student': return UserPlus;
      case 'faculty': return UserPlus;
      case 'leave': return Calendar;
      default: return Bell;
    }
  };

  const getColor = (type) => {
    switch(type) {
      case 'payment': return 'bg-green-100 text-green-600';
      case 'attendance': return 'bg-red-100 text-red-600';
      case 'student': return 'bg-blue-100 text-blue-600';
      case 'faculty': return 'bg-purple-100 text-purple-600';
      case 'leave': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="text-gray-600">{unreadCount} unread notifications</p>
        </div>
        <button onClick={markAllAsRead} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="card mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'unread' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('payment')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'payment' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Payments
          </button>
          <button
            onClick={() => setFilter('attendance')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'attendance' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Attendance
          </button>
          <button
            onClick={() => setFilter('student')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setFilter('faculty')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'faculty' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Faculty
          </button>
          <button
            onClick={() => setFilter('leave')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'leave' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Leave
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="card text-center py-12">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = getIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`card flex items-start space-x-4 ${
                  !notification.read ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getColor(notification.type)}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notifications;
