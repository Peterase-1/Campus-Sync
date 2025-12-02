import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';
import { Line, Doughnut } from 'react-chartjs-2';
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
  Calendar,
  Timer,
  StickyNote,
  ArrowRight
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

    // Auto-refresh every 30 seconds
    const intervalId = setInterval(() => {
      fetchAllData();
    }, 30000);

    // Refresh when user returns to tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchAllData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const fetchAllData = async () => {
    try {
      const [habits, finance, study, goals, pomodoro] = await Promise.all([
        habitsAPI.getAll().catch(() => []),
        financeAPI.getTransactions().catch(() => []),
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
      backgroundColor: ['#000000', '#e5e5e5'],
      borderWidth: 0,
    }]
  };

  // Finance Overview Chart Data
  const financeChartData = {
    labels: ['Income', 'Expenses', 'Savings'],
    datasets: [{
      data: [stats.totalIncome, stats.totalExpenses, stats.totalIncome - stats.totalExpenses],
      backgroundColor: ['#000000', '#666666', '#cccccc'],
      borderWidth: 0,
    }]
  };

  // Weekly Study Time (mock data - you can enhance this)
  const studyTimeData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Focus Hours',
      data: [2.5, 3, 1.5, 4, 2, 3.5, 1],
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderColor: '#000000',
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
      onClick: () => navigate('/app/habits')
    },
    {
      title: 'Balance',
      value: `$${stats.totalIncome - stats.totalExpenses}`,
      subtitle: `$${stats.totalIncome} income`,
      icon: DollarSign,
      onClick: () => navigate('/app/finance')
    },
    {
      title: 'Study Notes',
      value: stats.studyNotes,
      subtitle: 'Keep learning',
      icon: BookOpen,
      onClick: () => navigate('/app/desk')
    },
    {
      title: 'Goals',
      value: `${stats.completedGoals}/${stats.goals}`,
      subtitle: 'Completed',
      icon: Star,
      onClick: () => navigate('/app/goals')
    },
    {
      title: 'Focus Time',
      value: `${stats.focusHours}h`,
      subtitle: `${stats.pomodoroSessions} sessions`,
      icon: Timer,
      onClick: () => navigate('/app/pomodoro')
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />
      <div className="p-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-2 tracking-tight">
            Welcome back, {user?.name || 'Student'}! 👋
          </h1>
          <p className="text-gray-500 text-lg">
            Here's your productivity overview for today
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={stat.onClick}
              className="glass-card p-6 rounded-2xl cursor-pointer hover:border-black/20 dark:hover:border-white/20 transition-all group"
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-sm text-gray-500 mb-1 font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.subtitle}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Habit Completion Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-8 rounded-3xl"
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Habit Completion
            </h3>
            <div className="h-64 flex items-center justify-center">
              {stats.habits > 0 ? (
                <Doughnut
                  data={habitChartData}
                  options={{
                    plugins: {
                      legend: { display: true, position: 'bottom', labels: { usePointStyle: true } },
                    },
                    maintainAspectRatio: false,
                    cutout: '70%'
                  }}
                />
              ) : (
                <div className="text-center text-gray-400">
                  <p>No habits yet.</p>
                  <p className="text-sm">Start building habits!</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Finance Overview Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-8 rounded-3xl"
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Finance Overview
            </h3>
            <div className="h-64 flex items-center justify-center">
              {financeData.length > 0 ? (
                <Doughnut
                  data={financeChartData}
                  options={{
                    plugins: {
                      legend: { display: true, position: 'bottom', labels: { usePointStyle: true } },
                    },
                    maintainAspectRatio: false,
                    cutout: '70%'
                  }}
                />
              ) : (
                <div className="text-center text-gray-400">
                  <p>No transactions yet.</p>
                  <p className="text-sm">Start tracking finances!</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Study Time Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card p-8 rounded-3xl"
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5" />
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
                      ticks: { callback: (value) => `${value}h` },
                      grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    x: {
                      grid: { display: false }
                    }
                  },
                  maintainAspectRatio: false
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Deadlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-card p-8 rounded-3xl"
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Deadlines
            </h3>
            <div className="space-y-6">
              {stats.goals > 0 ? (
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-l-4 border-black dark:border-white">
                  <p className="font-medium">You have {stats.goals} active goals!</p>
                  <p className="text-sm text-gray-500 mt-1">Keep pushing forward.</p>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>No upcoming deadlines.</p>
                  <p className="text-sm">Set your first goal!</p>
                </div>
              )}
              <button
                onClick={() => navigate('/app/goals')}
                className="w-full btn btn-primary py-4 rounded-xl flex items-center justify-center gap-2 group"
              >
                View All Goals
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="glass-card p-8 rounded-3xl"
          >
            <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/app/habits')}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <Target className="w-6 h-6" />
                <span className="font-medium">Habits</span>
              </button>
              <button
                onClick={() => navigate('/app/pomodoro')}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <Timer className="w-6 h-6" />
                <span className="font-medium">Focus</span>
              </button>
              <button
                onClick={() => navigate('/app/desk')}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <BookOpen className="w-6 h-6" />
                <span className="font-medium">Study</span>
              </button>
              <button
                onClick={() => navigate('/app/notes')}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <StickyNote className="w-6 h-6" />
                <span className="font-medium">Notes</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;