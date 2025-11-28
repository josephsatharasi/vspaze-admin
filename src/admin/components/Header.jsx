import React from 'react';
import { GraduationCap, Search, Bell, Settings, Menu, LogOut } from 'lucide-react';

const Header = ({ onMenuClick, onLogoClick, onLogout, onProfileClick, onSettingsClick, onNotificationClick }) => {
  return (
    <header className="bg-gradient-to-r from-white via-blue-50 to-indigo-50 shadow-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <button onClick={onMenuClick} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex items-center space-x-2 md:space-x-3 cursor-pointer" onClick={onLogoClick}>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-2xl font-bold text-gray-900">vspaze Institute</h1>
                <p className="text-xs md:text-sm text-gray-500">Admin Dashboard</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-base font-bold text-gray-900">vspaze</h1>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 md:space-x-2">
            <div className="relative hidden lg:block">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search students, faculty, courses..." 
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <button onClick={onNotificationClick} className="relative p-1.5 md:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Notifications">
              <Bell className="w-5 h-5 md:w-6 md:h-6" />
              <span className="absolute top-0.5 right-0.5 md:top-1 md:right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button onClick={onSettingsClick} className="p-1.5 md:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Settings">
              <Settings className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button onClick={onLogout} className="p-1.5 md:p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Logout">
              <LogOut className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <div onClick={onProfileClick} className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow" title="View Profile">
              <span className="text-white text-xs md:text-sm font-semibold">AD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
