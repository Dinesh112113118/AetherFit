import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Map, Bell, Activity, User, Wind, X } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/map', icon: Map, label: 'Map' },
    { path: '/alerts', icon: Bell, label: 'Alerts' },
    { path: '/workouts', icon: Activity, label: 'Workouts' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const isActive = (path) => location.pathname === path;

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-30 md:hidden"
          />
        )}
      </AnimatePresence>
      <motion.div
        variants={sidebarVariants}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full bg-white w-64 z-40 shadow-lg border-r border-gray-200 flex flex-col"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Wind className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AetherFit</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6">
          <motion.ul
            className="space-y-2"
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
              closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
            }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <motion.li key={item.path} variants={itemVariants}>
                  <Link
                    to={item.path}
                    onClick={() => { if (window.innerWidth < 768) setIsOpen(false); }}
                    className={`relative flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      active
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="sidebar-active-indicator"
                        className="absolute inset-0 bg-blue-50 rounded-lg -z-10"
                      />
                    )}
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">© 2025 AetherFit. All rights reserved.</p>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
