import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, GraduationCap, History, UserCircle, Settings, LogOut } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Overview', path: '/' },
    
    {icon: GraduationCap, label: 'College Admission', path: '/college-admission'},
    {icon: GraduationCap, label: 'NAD Admission', path: '/nad-admission'},
    {icon: GraduationCap, label: 'Issue Certificate', path: '/issue-certificate'},
    {icon: GraduationCap, label: 'Transfer Credits', path: '/transfer-credits'},
    { icon: GraduationCap, label: 'Credits', path: '/credits' },
    { icon: History, label: 'History', path: '/history' },
    { icon: UserCircle, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img src="/api/placeholder/40/40" alt="Logo" className="h-8" />
            <div className="font-semibold text-sm text-blue-900">ABC Portal</div>
          </div>
        </div>
        
        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h1>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Welcome, USER
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                SS
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;