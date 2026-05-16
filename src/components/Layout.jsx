import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Sidebar = () => {
  const location = useLocation();
  const { userRole } = useApp();

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/clients', label: 'Clients', icon: '🏢' },
    { path: '/admin/labourers', label: 'Labourers', icon: '👷' },
    { path: '/admin/assignments', label: 'Assignments', icon: '📋' },
    { path: '/admin/attendance', label: 'Attendance', icon: '📍' },
    { path: '/admin/payroll', label: 'Payroll', icon: '💰' },
    { path: '/admin/ratings', label: 'Ratings', icon: '⭐' },
    { path: '/admin/invoices', label: 'Invoices', icon: '📄' },
    { path: '/admin/reports', label: 'Reports', icon: '📈' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  const clientLinks = [
    { path: '/client/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/client/workers', label: 'My Workers', icon: '👷' },
    { path: '/client/invoices', label: 'Invoices', icon: '📄' },
    { path: '/client/ratings', label: 'Rate Workers', icon: '⭐' },
  ];

  const labourerLinks = [
    { path: '/labourer/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/labourer/assignments', label: 'My Jobs', icon: '📋' },
    { path: '/labourer/attendance', label: 'Attendance', icon: '📍' },
    { path: '/labourer/payroll', label: 'Salary', icon: '💰' },
    { path: '/labourer/ratings', label: 'My Ratings', icon: '⭐' },
  ];

  const links = userRole === 'admin' ? adminLinks : userRole === 'client' ? clientLinks : labourerLinks;
  const isActive = (path) => location.pathname === path;
  const roleLabel = userRole === 'labourer' ? 'Labour' : userRole.charAt(0).toUpperCase() + userRole.slice(1);

  return (
    <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white h-screen overflow-y-auto fixed left-0 top-0">
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-2xl font-bold">LMP</h1>
        <p className="text-sm text-blue-200">Labour Management</p>
        <div className="mt-3 text-xs bg-blue-700 px-2 py-1 rounded inline-block capitalize">
          {roleLabel} View
        </div>
      </div>

      <nav className="p-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-4 py-2 my-1 rounded transition ${
              isActive(link.path)
                ? 'bg-blue-600 text-white'
                : 'text-blue-100 hover:bg-blue-700'
            }`}
          >
            <span className="text-lg">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export const Header = () => {
  const { userRole, setUserRole } = useApp();

  const handleRoleChange = (role) => {
    setUserRole(role);
    // Redirect to appropriate dashboard
    window.location.href = `/${role}/dashboard`;
  };

  return (
    <header className="bg-white shadow-md fixed right-0 left-64 top-0 z-40">
      <div className="flex justify-between items-center px-8 py-4">
        <h2 className="text-lg font-semibold text-gray-800">Labour Management Platform</h2>
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            {['admin', 'client', 'labourer'].map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  userRole === role
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {role === 'labourer' ? 'Labour' : role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              👤
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">User</p>
              <p className="text-xs text-gray-500">Logged in</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="mt-24 p-8 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};
