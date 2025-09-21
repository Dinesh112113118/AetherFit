import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, User, Settings, LogOut, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnClickOutside } from '../hooks/useClickOutside';
import { useUser } from '../context/UserContext';

const Navbar = ({ onMenuClick }) => {
  const { user } = useUser();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notificationRef = useRef();
  const profileRef = useRef();

  useOnClickOutside(notificationRef, () => setNotificationOpen(false));
  useOnClickOutside(profileRef, () => setProfileOpen(false));

  const notifications = [
    { type: 'alert', message: 'High Ozone Alert for your morning run.', time: '5m ago', icon: <AlertCircle className="h-5 w-5 text-red-500" /> },
    { type: 'info', message: 'Air quality is excellent for cycling today.', time: '1h ago', icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
    { type: 'alert', message: 'PM2.5 levels are rising in your area.', time: '3h ago', icon: <AlertCircle className="h-5 w-5 text-orange-500" /> },
  ];

  const userMenuItems = [
    { label: 'Profile', path: '/profile', icon: <User className="h-4 w-4" /> },
    { label: 'Settings', path: '/profile', icon: <Settings className="h-4 w-4" /> },
    { label: 'Logout', path: '#', icon: <LogOut className="h-4 w-4" /> },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <header className="sticky top-0 bg-white/75 backdrop-blur-lg z-20">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        {/* Left side: Menu button */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          aria-label="Toggle Menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Right side: Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </button>
            <AnimatePresence>
              {notificationOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 origin-top-right"
                >
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="py-2">
                    {notifications.map((notif, index) => (
                      <div key={index} className="flex items-start px-4 py-3 hover:bg-gray-50">
                        <div className="mt-1 mr-3">{notif.icon}</div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">{notif.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-gray-200">
                    <Link to="/alerts" onClick={() => setNotificationOpen(false)} className="block w-full text-center text-sm font-medium text-blue-600 hover:bg-blue-50 py-2 rounded-lg">
                      View all alerts
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100"
            >
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User profile"
              />
              <span className="hidden sm:inline text-sm font-medium text-gray-700">{user.name}</span>
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 origin-top-right"
                >
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <div className="py-2">
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item.icon}
                        <span className="ml-3">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
