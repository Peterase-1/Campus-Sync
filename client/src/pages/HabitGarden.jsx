import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';
import { Plus, Target, CheckCircle, Flame, Trash2 } from 'lucide-react';
import { habitsAPI } from '../utils/api';

const HabitGarden = () => {
  const { user } = useUser();
  const [habits, setHabits] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: '', description: '', frequency: 'daily' });

  // Load habits from DB on mount
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const data = await habitsAPI.getAll();
        setHabits(data);
      } catch (e) {
        console.error('Failed to load habits', e);
      }
    };
    fetchHabits();
  }, []);

  const addHabit = async () => {
    if (!newHabit.name.trim()) return;
    // Prevent duplicate names
    if (habits.find(h => h.name.toLowerCase().trim() === newHabit.name.toLowerCase().trim())) {
      alert('A habit with this name already exists!');
      return;
    }
    try {
      const created = await habitsAPI.create(newHabit);
      setHabits(prev => [...prev, created]);
      setNewHabit({ name: '', description: '', frequency: 'daily' });
      setShowAddForm(false);
    } catch (e) {
      console.error('Failed to create habit', e);
    }
  };

  const toggleHabit = async (habit) => {
    try {
      const updated = await habitsAPI.update(habit.id, { completed: !habit.completed });
      setHabits(prev => prev.map(h => (h.id === habit.id ? updated : h)));
    } catch (e) {
      console.error('Failed to update habit', e);
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      await habitsAPI.delete(habitId);
      setHabits(prev => prev.filter(h => h.id !== habitId));
    } catch (e) {
      console.error('Failed to delete habit', e);
    }
  };

  const resetStreak = async (habit) => {
    try {
      const updated = await habitsAPI.update(habit.id, { streak: 0, lastCompleted: null });
      setHabits(prev => prev.map(h => (h.id === habit.id ? updated : h)));
    } catch (e) {
      console.error('Failed to reset streak', e);
    }
  };

  // Function to check and reset streaks for missed days (client side)
  const checkStreakReset = () => {
    const today = new Date();
    let hasChanges = false;
    const updated = habits.map(habit => {
      if (habit.lastCompleted) {
        const last = new Date(habit.lastCompleted);
        const diff = Math.floor((today - last) / (1000 * 60 * 60 * 24));
        if (diff > 1 && habit.streak > 0) {
          hasChanges = true;
          return { ...habit, streak: 0 };
        }
      }
      return habit;
    });

    if (hasChanges) {
      setHabits(updated);
      updated.forEach(h => {
        if (h.streak === 0 && habits.find(old => old.id === h.id).streak > 0) {
          habitsAPI.update(h.id, { streak: 0 });
        }
      });
    }
  };

  useEffect(() => {
    if (habits.length) checkStreakReset();
  }, [habits]);

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
            Habit Garden 🌱
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-300">
            Cultivate positive habits and watch your garden grow!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Habits</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{habits.length}</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed Today</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {habits.filter(h => h.completed).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Best Streak</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.max(...habits.map(h => h.streak || 0), 0)}
                </p>
              </div>
              <Flame className="w-8 h-8 text-orange-600" />
            </div>
          </motion.div>
        </div>

        {/* Add Habit Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="mb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Habit</span>
        </motion.button>

        {/* Add Habit Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Habit</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Habit Name</label>
                <input
                  type="text"
                  value={newHabit.name}
                  onChange={e => setNewHabit({ ...newHabit, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Drink 8 glasses of water"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (Optional)</label>
                <input
                  type="text"
                  value={newHabit.description}
                  onChange={e => setNewHabit({ ...newHabit, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Why is this habit important?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Frequency</label>
                <select
                  value={newHabit.frequency}
                  onChange={e => setNewHabit({ ...newHabit, frequency: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={addHabit}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
                >Add Habit</button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >Cancel</button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Habits List */}
        <div className="space-y-4">
          {habits.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No habits yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Start building positive habits to improve your student life!</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
              >Add Your First Habit</button>
            </motion.div>
          ) : (
            habits.map((habit, index) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 ${habit.completed ? 'ring-2 ring-green-500' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleHabit(habit)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${habit.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-gray-600 hover:border-green-500'}`}
                    >
                      {habit.completed && <CheckCircle className="w-5 h-5" />}
                    </button>
                    <div>
                      <h3 className={`text-lg font-semibold ${habit.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>{habit.name}</h3>
                      {habit.description && (<p className="text-gray-600 dark:text-gray-400 text-sm">{habit.description}</p>)}
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{habit.frequency}</span>
                        <div className="flex items-center space-x-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{habit.streak || 0} day streak</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {habit.streak > 0 && (
                      <button
                        onClick={() => resetStreak(habit)}
                        className="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
                        title="Reset Streak"
                      >
                        <Target className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="p-2 text-gray-400 hover:text-red-5 transition-colors"
                      title="Delete Habit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitGarden;