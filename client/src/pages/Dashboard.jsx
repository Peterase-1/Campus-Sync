import React, { useState, useEffect } from 'react';
import { mot ion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import {
  Target,
  DollarSign,
  BookOpen,
  Star,
  Clock,
  TrendingUp,
  Calendar,
  CheckCircle,
  Timer,
  StickyNote
} from 'lucide-react';
import { habitsAPI, financeAPI, studyAPI, goalsAPI, pomodoroAPI } from '../utils/api';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    habits: 0,
    completedHabits: 0,
    totalExpenses: 0,
    totalIncome: 0,
    studyNotes: 0,
    goals: 0,
    completedGoals: 0,
    pomodoroSessions: 0,
    focusHours: 0
  });
  const [habitData, setHabitData] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [habits, finance, study, goals, pomodoro] = await Promise.all([
        habitsAPI.getAll().catch(() => []),
        financeAPI.getAll().catch(() => []),
        studyAPI.getNotes().catch(() => []),
        goalsAPI.getAll().catch(() => []),
        pomodoroAPI.getStats().catch(() => ({ totalSessions: 0, totalHours: 0 }))
      ]);

      setHabitData(habits);
      setFinanceData(finance);

      const income = finance.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const expenses = finance.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

      setStats({
        habits: habits.length,
        completedHabits: habits.filter(h => h.completed).length,
        totalExpenses: expenses,
        totalIncome: income,
        studyNotes: study.length,
        goals: goals.length,
        completedGoals: goals.filter(g => g.completed).length,
        pomodoroSessions: pomodoro.totalSessions || 0,
        focusHours: pomodoro.totalHours || 0
      });

      setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setIsLoading(false);
    }
  };

  // Habit Completion Chart Data
  const habitChartData = {
    labels: ['Completed', 'Pending'],
    datasets: [{
      data: [stats.completedHabits, stats.habits - stats.completedHabits],
      backgroundColor: ['#10b981', '#e5e7eb'],
      borderWidth: 0,
    }]
  };

  // Finance Overview Chart Data
  const financeChartData = {
    labels: ['Income', 'Expenses', 'Savings'],
    datasets: [{
      data: [stats.totalIncome, stats.totalExpenses, stats.totalIncome - stats.totalExpenses],
      backgroundColor: ['#10b981', '#ef4444', '#3b82f6'],
      borderWidth: 0,
    }]
  };

  // Weekly Study Time (mock data - you can enhance this)
  const studyTimeData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Focus Hours',
      data: [2.5, 3, 1.5, 4, 2, 3.5, 1],
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      borderColor: '#10b981',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    }]
  };

  const quickStats = [
    {
      title: 'Active Habits',
      value: stats.habits,
      subtitle: `${stats.completedHabits} completed`,
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      onClick: () => navigate('/app/habits')
    },
    {
      title: 'Balance',
      value: `$${stats.totalIncome - stats.totalExpenses}`,
      subtitle: `$${stats.totalIncome} income`,
      icon: DollarSign,
      color: 'from-blue-500 to-cyan-500',
      onClick: () => navigate('/app/finance')
    },
    {
      title: 'Study Notes',
      value: stats.studyNotes,
      subtitle: 'Keep learning',
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500',
      onClick: () => navigate('/app/desk')
    },
    {
      title: 'Goals',
      value: `${stats.completedGoals}/${stats.goals}`,
      subtitle: 'Completed',
      icon: Star,
      color: 'from-orange-500 to-amber-500',
      onClick: () => navigate('/app/goals')
    },
    {
      title: 'Focus Time',
      value: `${stats.focusHours}h`,
      subtitle: `${stats.pomodoroSessions} sessions`,
      icon: Timer,
      color: 'from-red-500 to-rose-500',
      onClick: () => navigate('/app/pomodoro')
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name || 'Student'}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's your productivity overview for today
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={stat.onClick}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.subtitle}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Habit Completion Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Habit Completion
            </h3>
            <div className="h-64 flex items-center justify-center">
              {stats.habits > 0 ? (
                <Doughnut
                  data={habitChartData}
                  options={{
                    plugins: {
                      legend: { display: true, position: 'bottom' },
                    },
                    maintainAspectRatio: false
                  }}
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  No habits yet.<br />Start building habits!
                </p>
              )}
            </div>
          </motion.div>

          {/* Finance Overview Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Finance Overview
            </h3>
            <div className="h-64 flex items-center justify-center">
              {financeData.length > 0 ? (
                <Doughnut
                  data={financeChartData}
                  options={{
                    plugins: {
                      legend: { display: true, position: 'bottom' },
                    },
                    maintainAspectRatio: false
                  }}
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  No transactions yet.<br />Start tracking finances!
                </p>
              )}
            </div>
          </motion.div>

          {/* Study Time Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              Weekly Focus Time
            </h3>
            <div className="h-64">
              <Line
                data={studyTimeData}
                options={{
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { callback: (value) => `${value}h` }
                    }
                  },
                  maintainAspectRatio: false
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Deadlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              Upcoming Deadlines
            </h3>
            <div className="space-y-3">
              {stats.goals > 0 ? (
                <p className="text-gray-600 dark:text-gray-300">You have {stats.goals} active goals!</p>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No upcoming deadlines. Set your first goal!</p>
              )}
              <button
                onClick={() => navigate('/app/goals')}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                View All Goals
              </button>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/app/habits')}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Target className="w-4 h-4" />
                Habits
              </button>
              <button
                onClick={() => navigate('/app/pomodoro')}
                className="bg-gradient-to-r from-red-500 to-rose-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Timer className="w-4 h-4" />
                Focus
              </button>
              <button
                onClick={() => navigate('/app/desk')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Study
              </button>
              <button
                onClick={() => navigate('/app/notes')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <StickyNote className="w-4 h-4" />
                Notes
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;