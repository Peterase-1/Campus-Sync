import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import {
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  Zap,
  Brain,
  Heart,
  Home,
  Target,
  DollarSign,
  BookOpen,
  Star
} from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { user } = useUser();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/app', icon: Sparkles, color: 'from-green-500 to-green-600' },
    { name: 'Habits', href: '/app/habits', icon: Target, color: 'from-green-500 to-green-600' },
    { name: 'Finance', href: '/app/finance', icon: DollarSign, color: 'from-green-500 to-green-600' },
    { name: 'Study Desk', href: '/app/desk', icon: BookOpen, color: 'from-green-500 to-green-600' },
    { name: 'Goals', href: '/app/goals', icon: Star, color: 'from-green-500 to-green-600' },
  ];

  const isActive = (path) => location.pathname === path;

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

            {/* User Avatar */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
              </span>
            </motion.div>

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

              {/* Mobile Home Link */}
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navigation.length * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-white/10 transition-all duration-300"
                >
                  <Home className="w-5 h-5 mr-3" />
                  <span className="font-medium">Back to Home</span>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
