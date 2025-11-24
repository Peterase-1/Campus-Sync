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
  Settings,
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
    { name: 'Dashboard', href: '/app', icon: Sparkles, color: 'from-green-500 to-green-600' },
    { name: 'Timetable', href: '/app/timetable', icon: Home, color: 'from-green-500 to-green-600' },
    { name: 'Habits', href: '/app/habits', icon: Target, color: 'from-green-500 to-green-600' },
    { name: 'Finance', href: '/app/finance', icon: DollarSign, color: 'from-green-500 to-green-600' },
    { name: 'Study Desk', href: '/app/desk', icon: BookOpen, color: 'from-green-500 to-green-600' },
    { name: 'Goals', href: '/app/goals', icon: Star, color: 'from-green-500 to-green-600' },
    { name: 'Pomodoro', href: '/app/pomodoro', icon: Timer, color: 'from-green-500 to-green-600' },
    { name: 'Notes', href: '/app/notes', icon: StickyNote, color: 'from-green-500 to-green-600' },
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
    <nav className="sticky top-0 z-50 glass backdrop-blur-xl border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/app" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-10 h-10 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white font-mono">Cumpas Sync</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Student Life Manager</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center px-4 py-2 rounded-xl transition-all duration-300 ${isActive(item.href)
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-white/10'
                    }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{item.name}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-xl glass hover:bg-white/20 transition-all duration-300"
            >
              {isDark ? <Sun size={18} className="text-slate-600 dark:text-slate-300" /> : <Moon size={18} className="text-slate-600 dark:text-slate-300" />}
            </motion.button>

            {/* User Avatar with Dropdown */}
            <div className="relative" ref={profileRef}>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="w-10 h-10 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer"
              >
                <span className="text-white font-bold text-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </motion.button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.email || 'user@example.com'}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={handleProfileClick}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <UserIcon className="w-4 h-4 mr-3" />
                        Profile Settings
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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
              className="md:hidden p-2 rounded-xl glass hover:bg-white/20 transition-all duration-300"
            >
              {mobileMenuOpen ? <X size={20} className="text-slate-600 dark:text-slate-300" /> : <Menu size={20} className="text-slate-600 dark:text-slate-300" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/20"
          >
            <div className="py-4 space-y-2">
              {navigation.map((item, index) => (
                <Link key={item.name} to={item.href} onClick={() => setMobileMenuOpen(false)}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${isActive(item.href)
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-white/10'
                      }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.name}</span>
                  </motion.div>
                </Link>
              ))}

              {/* Mobile Profile & Logout */}
              <Link to="/app/profile" onClick={() => setMobileMenuOpen(false)}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navigation.length * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-white/10 transition-all duration-300"
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
                  transition={{ duration: 0.3, delay: (navigation.length + 1) * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  <span className="font-medium">Logout</span>
                </motion.div>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
