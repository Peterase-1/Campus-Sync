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

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-2 tracking-tight"
            >
              Life Goals
            </motion.h1>
            <p className="text-gray-500">
              Set and track your personal and academic goals
            </p>
          </div>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn btn-primary px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Goal</span>
          </motion.button>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-600 dark:text-red-400">{error}</span>
          </motion.div>
        )}

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${selectedCategory === cat.value
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Add Goal Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold mb-4">Add New Goal</h3>
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
                  className="input"
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
                  className="input resize-none"
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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

              <div className="flex space-x-3 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary px-6 py-2 rounded-lg"
                >
                  Create Goal
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn btn-secondary px-6 py-2 rounded-lg"
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
            <div className="inline-block w-8 h-8 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading goals...</p>
          </div>
        ) : filteredGoals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 glass-card rounded-3xl"
          >
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">
              No goals yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start by adding your first goal!
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn btn-primary px-6 py-2 rounded-lg"
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
                  className={`glass-card rounded-2xl p-6 group hover:border-black/20 dark:hover:border-white/20 transition-all ${goal.completed ? 'opacity-75' : ''
                    }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                          {goal.title}
                          {goal.completed && (
                            <CheckCircle2 className="w-5 h-5 text-black dark:text-white" />
                          )}
                        </h3>
                        {goal.description && (
                          <p className="text-gray-500 text-sm mt-1">
                            {goal.description}
                          </p>
                        )}
                        {goal.targetDate && (
                          <div className="flex items-center gap-1 mt-2 text-sm text-gray-400">
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
                          ? 'bg-black text-white dark:bg-white dark:text-black'
                          : 'bg-gray-100 text-gray-400 hover:bg-black hover:text-white dark:bg-gray-800 dark:hover:bg-white dark:hover:text-black'
                          }`}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
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
                        <span className="text-gray-500">Progress</span>
                        <span className="font-bold">{goal.progress}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={goal.progress}
                        onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer slider accent-black dark:accent-white"
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
