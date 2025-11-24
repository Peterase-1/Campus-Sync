import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import {
  Target,
  Plus,
  Trash2,
  Calendar,
  TrendingUp,
  BookOpen,
  Briefcase,
  Heart,
  User,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { goalsAPI } from '../utils/api';

const Goals = () => {
  const { user } = useUser();
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'personal',
    targetDate: ''
  });
  const [error, setError] = useState('');

  const categories = [
    { value: 'all', label: 'All Goals', icon: Target },
    { value: 'personal', label: 'Personal', icon: User },
    { value: 'academic', label: 'Academic', icon: BookOpen },
    { value: 'career', label: 'Career', icon: Briefcase },
    { value: 'health', label: 'Health', icon: Heart }
  ];

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setError('');
      const data = await goalsAPI.getAll();
      setGoals(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch goals:', err);
      setError('Failed to load goals. Please try again.');
      setIsLoading(false);
    }
  };

  const addGoal = async (e) => {
    e.preventDefault();
    if (!newGoal.title) return;

    try {
      setError('');
      const created = await goalsAPI.create(newGoal);
      setGoals([created, ...goals]);
      setNewGoal({ title: '', description: '', category: 'personal', targetDate: '' });
      setShowAddForm(false);
    } catch (err) {
      setError('Failed to create goal. Please try again.');
    }
  };

  const updateGoalProgress = async (id, progress) => {
    try {
      const updated = await goalsAPI.update(id, { progress });
      setGoals(goals.map(g => g.id === id ? updated : g));
    } catch (err) {
      setError('Failed to update goal');
    }
  };

  const toggleGoalComplete = async (id, completed) => {
    try {
      const updated = await goalsAPI.update(id, { completed: !completed, progress: !completed ? 100 : 0 });
      setGoals(goals.map(g => g.id === id ? updated : g));
    } catch (err) {
      setError('Failed to update goal');
    }
  };

  const deleteGoal = async (id) => {
    try {
      await goalsAPI.delete(id);
      setGoals(goals.filter(g => g.id !== id));
    } catch (err) {
      setError('Failed to delete goal');
    }
  };

  const filteredGoals = selectedCategory === 'all'
    ? goals
    : goals.filter(goal => goal.category === selectedCategory);

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : Target;
  };

  const getCategoryColor = (category) => {
    const colors = {
      personal: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      academic: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      career: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      health: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
    };
    return colors[category] || colors.personal;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />

      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
          >
            Life Goals 🎯
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-300">
            Set and track your personal and academic goals
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-2">
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(!showAddForm)}
            className="mb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
        >
            <Plus className="w-5 h-5" />
            <span>Add New Goal</span>
          </motion.button>

        {/* Add Goal Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Goal</h3>
            <form onSubmit={addGoal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Goal Title
                </label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="What do you want to achieve?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  rows="3"
                  placeholder="Add more details about your goal..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {categories.slice(1).map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  Create Goal
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Goals List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading goals...</p>
          </div>
        ) : filteredGoals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No goals yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start by adding your first goal!
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Add Your First Goal
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredGoals.map((goal, index) => {
              const Icon = getCategoryIcon(goal.category);
              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 ${goal.completed ? 'ring-2 ring-green-500' : ''
                    }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${getCategoryColor(goal.category)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          {goal.title}
                          {goal.completed && (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          )}
                        </h3>
                        {goal.description && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                            {goal.description}
                          </p>
                        )}
                        {goal.targetDate && (
                          <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            Target: {new Date(goal.targetDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleGoalComplete(goal.id, goal.completed)}
                        className={`p-2 rounded-lg transition-colors ${goal.completed
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/20'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete Goal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {!goal.completed && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-300">Progress</span>
                        <span className="font-semibold">{goal.progress}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={goal.progress}
                        onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Goals;
