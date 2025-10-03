import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';
import {
  Sparkles,
  Zap,
  TrendingUp,
  Target,
  DollarSign,
  BookOpen,
  Calendar,
  CheckCircle,
  AlertCircle,
  Star,
  Brain,
  Rocket,
  Shield,
  Heart,
  Lightbulb,
  Award,
  Users,
  BarChart3,
  Clock,
  Globe,
  Plus,
  Edit3,
  Trash2,
  MoreHorizontal,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Activity,
  PieChart,
  TrendingDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const Dashboard = () => {
  const { user, updateUserData } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate user progress
  const totalHabits = user?.data?.habits?.length || 0;
  const completedHabits = user?.data?.habits?.filter(h => h.completed)?.length || 0;
  const totalSavings = user?.data?.finances?.totalSavings || 0;
  const monthlyGoal = user?.data?.finances?.monthlyGoal || 1000;
  const studyNotes = user?.data?.studies?.notes?.length || 0;
  const activeGoals = user?.data?.goals?.length || 0;

  const stats = [
    {
      title: 'Active Habits',
      value: totalHabits,
      change: totalHabits > 0 ? `${Math.round((completedHabits / totalHabits) * 100)}% completed` : 'Start building habits',
      icon: Target,
      color: 'text-emerald-500',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20',
      gradient: 'from-emerald-500 to-green-500',
      progress: totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0
    },
    {
      title: 'Total Savings',
      value: `$${totalSavings}`,
      change: totalSavings > 0 ? `${Math.round((totalSavings / monthlyGoal) * 100)}% of monthly goal` : 'Start saving today',
      icon: DollarSign,
      color: 'text-blue-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20',
      gradient: 'from-blue-500 to-cyan-500',
      progress: totalSavings > 0 ? Math.min((totalSavings / monthlyGoal) * 100, 100) : 0
    },
    {
      title: 'Study Notes',
      value: studyNotes,
      change: studyNotes > 0 ? 'Keep learning!' : 'Create your first note',
      icon: BookOpen,
      color: 'text-purple-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20',
      gradient: 'from-purple-500 to-pink-500',
      progress: studyNotes > 0 ? Math.min(studyNotes * 10, 100) : 0
    },
    {
      title: 'Active Goals',
      value: activeGoals,
      change: activeGoals > 0 ? 'Keep pushing!' : 'Set your first goal',
      icon: CheckCircle,
      color: 'text-orange-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20',
      gradient: 'from-orange-500 to-amber-500',
      progress: activeGoals > 0 ? Math.min(activeGoals * 20, 100) : 0
    }
  ];

  const recentActivities = user?.data?.recentActivities || [
    { id: 1, action: 'Welcome to Cumpas Sync!', time: 'Just now', icon: Sparkles, clickable: false },
    { id: 2, action: 'Start building your first habit', time: 'Get started', icon: Target, clickable: true, navigate: () => navigate('/app/habits') },
    { id: 3, action: 'Create your first study note', time: 'Get started', icon: BookOpen, clickable: true, navigate: () => navigate('/app/desk') },
    { id: 4, action: 'Set your first goal', time: 'Get started', icon: Star, clickable: true, navigate: () => navigate('/app/goals') },
  ];

  const quickActions = [
    {
      name: 'Add New Habit',
      icon: Target,
      color: 'bg-gradient-to-r from-emerald-500 to-green-500',
      hover: 'hover:from-emerald-600 hover:to-green-600',
      action: () => navigate('/app/habits')
    },
    {
      name: 'Log Expense',
      icon: DollarSign,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      hover: 'hover:from-blue-600 hover:to-cyan-600',
      action: () => navigate('/app/finance')
    },
    {
      name: 'Create Note',
      icon: BookOpen,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      hover: 'hover:from-purple-600 hover:to-pink-600',
      action: () => navigate('/app/desk')
    },
    {
      name: 'Set Goal',
      icon: Star,
      color: 'bg-gradient-to-r from-orange-500 to-amber-500',
      hover: 'hover:from-orange-600 hover:to-amber-600',
      action: () => navigate('/app/goals')
    },
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3, action: () => setActiveTab('overview') },
    { id: 'habits', name: 'Habits', icon: Target, action: () => navigate('/app/habits') },
    { id: 'finance', name: 'Finance', icon: DollarSign, action: () => navigate('/app/finance') },
    { id: 'studies', name: 'Studies', icon: BookOpen, action: () => navigate('/app/desk') },
    { id: 'goals', name: 'Goals', icon: Star, action: () => navigate('/app/goals') },
  ];

  // Handle stat card clicks
  const handleStatClick = (statTitle) => {
    switch (statTitle) {
      case 'Active Habits':
        navigate('/app/habits');
        break;
      case 'Total Savings':
        navigate('/app/finance');
        break;
      case 'Study Notes':
        navigate('/app/desk');
        break;
      case 'Active Goals':
        navigate('/app/goals');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <div className="p-4 space-y-4">
        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-1 sm:gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 sm:p-2 overflow-x-auto scrollbar-hide"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={tab.action}
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`${stat.bgColor} rounded-2xl p-3 sm:p-4 relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300`}
              onClick={() => handleStatClick(stat.title)}
            >
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">{stat.change}</span>
                <div className="flex items-center space-x-1">
                  {stat.progress > 0 ? (
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Live updates</span>
              </div>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className={`flex items-center space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group ${activity.clickable ? 'cursor-pointer' : ''
                    }`}
                  onClick={activity.clickable ? activity.navigate : undefined}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <activity.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{activity.action}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Quick Actions</h3>
              <Zap className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.name}
                  onClick={action.action}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full flex items-center space-x-4 p-4 rounded-xl ${action.color} ${action.hover} shadow-lg hover:shadow-xl transition-all duration-300 group`}
                >
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-white">{action.name}</span>
                  <div className="ml-auto">
                    <ChevronRight className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Motivational Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-4 sm:p-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl"
          >
            <Award className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
          >
            "Success is the sum of small efforts repeated day in and day out."
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="text-gray-600 dark:text-gray-300 mb-6"
          >
            Keep up the amazing work! You're building something incredible. 🚀
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400"
          >
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Join 10,000+ students</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Available worldwide</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Track your progress</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;