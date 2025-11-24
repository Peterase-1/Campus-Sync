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
      const data = await goalsAPI.getAll();
      setGoals(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch goals:', err);
      setError('Failed to load goals');
      setIsLoading(false);
    }
  };

  const addGoal = async (e) => {
    e.preventDefault();
    if (!newGoal.title) return;

    try {
      const created = await goalsAPI.create(newGoal);
      setGoals([created, ...goals]);
      setNewGoal({ title: '', description: '', category: 'personal', targetDate: '' });
      setShowAddForm(false);
    } catch (err) {
      setError('Failed to create goal');
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Life Goals</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Set and track your personal and academic goals
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-600 dark:text-red-400">{error}</span>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${selectedCategory === cat.value
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Add Goal Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full mb-6 btn btn-primary py-4 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Goal
        </motion.button>

        {/* Add Goal Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-6"
          >
            <form onSubmit={addGoal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Goal Title
                </label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  required
                  className="input"
                  placeholder="What do you want to achieve?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  className="input resize-none"
                  rows="3"
                  placeholder="Add more details about your goal..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                    className="input"
                  >
                    {categories.slice(1).map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                    className="input"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary flex-1">
                  Create Goal
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn btn-secondary"
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
          <div className="text-center py-12 card">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No goals yet</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Start by adding your first goal!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredGoals.map((goal) => {
              const Icon = getCategoryIcon(goal.category);
              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card hover:shadow-lg transition-shadow"
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
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                          }`}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        className="p-2 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
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
