import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import {
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  Home,
  Target,
  DollarSign,
  BookOpen,
  Star,
  LogOut,
  User as UserIcon,
  Timer,
  StickyNote
} from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);

  const navigation = [
    { name: 'Dashboard', href: '/app', icon: Sparkles },
    { name: 'Timetable', href: '/app/timetable', icon: Home },
    { name: 'Habits', href: '/app/habits', icon: Target },
    { name: 'Finance', href: '/app/finance', icon: DollarSign },
    { name: 'Study Desk', href: '/app/desk', icon: BookOpen },
    { name: 'Goals', href: '/app/goals', icon: Star },
    { name: 'Pomodoro', href: '/app/pomodoro', icon: Timer },
    { name: 'Notes', href: '/app/notes', icon: StickyNote },
  ];

  const isActive = (path) => location.pathname === path;

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setProfileMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/app/profile');
    setProfileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-black/5 dark:border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 text-white dark:text-black" />
              </motion.div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold tracking-tight text-black dark:text-white">Cumpas Sync</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${isActive(item.href)
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg'
                    : 'text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{item.name}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Sun size={20} className="text-black dark:text-white" /> : <Moon size={20} className="text-black dark:text-white" />}
            </motion.button>

            {/* User Avatar with Dropdown */}
            <div className="relative" ref={profileRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors"
              >
                <span className="text-white dark:text-black font-bold text-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </motion.button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 glass-card rounded-2xl shadow-xl overflow-hidden z-50"
                  >
                    {/* User Info */}
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-bold text-black dark:text-white truncate">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-1">
                        {user?.email || 'user@example.com'}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <button
                        onClick={handleProfileClick}
                        className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
                      >
                        <UserIcon className="w-4 h-4 mr-3" />
                        Profile Settings
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors mt-1"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} className="text-black dark:text-white" /> : <Menu size={24} className="text-black dark:text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-black/5 dark:border-white/5 overflow-hidden bg-white dark:bg-black"
            >
              <div className="py-4 space-y-2 px-2">
                {navigation.map((item, index) => (
                  <Link key={item.name} to={item.href} onClick={() => setMobileMenuOpen(false)}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${isActive(item.href)
                        ? 'bg-black text-white dark:bg-white dark:text-black'
                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.name}</span>
                    </motion.div>
                  </Link>
                ))}

                <div className="h-px bg-gray-100 dark:bg-gray-800 my-2 mx-4"></div>

                {/* Mobile Profile & Logout */}
                <Link to="/app/profile" onClick={() => setMobileMenuOpen(false)}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: navigation.length * 0.05 }}
                    className="flex items-center px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    <UserIcon className="w-5 h-5 mr-3" />
                    <span className="font-medium">Profile Settings</span>
                  </motion.div>
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (navigation.length + 1) * 0.05 }}
                    className="flex items-center px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    <span className="font-medium">Logout</span>
                  </motion.div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
