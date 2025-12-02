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
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />
      <div className="p-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-2 tracking-tight"
          >
            Habit Garden
          </motion.h1>
          <p className="text-gray-500 text-lg">
            Cultivate positive habits and watch your garden grow!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Habits</p>
                <p className="text-3xl font-bold mt-1">{habits.length}</p>
              </div>
              <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white dark:text-black" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Completed Today</p>
                <p className="text-3xl font-bold mt-1">
                  {habits.filter(h => h.completed).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white dark:text-black" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Best Streak</p>
                <p className="text-3xl font-bold mt-1">
                  {Math.max(...habits.map(h => h.streak || 0), 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white dark:text-black" />
              </div>
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
          className="mb-8 btn btn-primary px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Habit</span>
        </motion.button>

        {/* Add Habit Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold mb-6">Add New Habit</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Habit Name</label>
                <input
                  type="text"
                  value={newHabit.name}
                  onChange={e => setNewHabit({ ...newHabit, name: e.target.value })}
                  className="input w-full"
                  placeholder="e.g., Drink 8 glasses of water"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description (Optional)</label>
                <input
                  type="text"
                  value={newHabit.description}
                  onChange={e => setNewHabit({ ...newHabit, description: e.target.value })}
                  className="input w-full"
                  placeholder="Why is this habit important?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Frequency</label>
                <select
                  value={newHabit.frequency}
                  onChange={e => setNewHabit({ ...newHabit, frequency: e.target.value })}
                  className="input w-full"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={addHabit}
                  className="btn btn-primary px-6 py-2 rounded-lg"
                >Add Habit</button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="btn btn-secondary px-6 py-2 rounded-lg"
                >Cancel</button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Habits List */}
        <div className="space-y-4">
          {habits.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 glass-card rounded-3xl">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No habits yet</h3>
              <p className="text-gray-500 mb-6">Start building positive habits to improve your student life!</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn btn-primary px-6 py-2 rounded-lg"
              >Add Your First Habit</button>
            </motion.div>
          ) : (
            habits.map((habit, index) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`glass-card rounded-2xl p-6 hover:border-black/20 dark:hover:border-white/20 transition-all ${habit.completed ? 'opacity-75' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => toggleHabit(habit)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${habit.completed ? 'bg-black border-black text-white dark:bg-white dark:border-white dark:text-black' : 'border-gray-300 hover:border-black dark:hover:border-white'}`}
                    >
                      {habit.completed && <CheckCircle className="w-5 h-5" />}
                    </button>
                    <div>
                      <h3 className={`text-lg font-bold ${habit.completed ? 'line-through text-gray-400' : ''}`}>{habit.name}</h3>
                      {habit.description && (<p className="text-gray-500 text-sm">{habit.description}</p>)}
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs font-medium uppercase tracking-wider text-gray-400">{habit.frequency}</span>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Flame className="w-4 h-4" />
                          <span className="text-xs font-medium">{habit.streak || 0} day streak</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {habit.streak > 0 && (
                      <button
                        onClick={() => resetStreak(habit)}
                        className="p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                        title="Reset Streak"
                      >
                        <Target className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
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