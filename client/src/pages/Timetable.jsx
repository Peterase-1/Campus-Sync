import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { timetableAPI } from '../utils/api';
import {
  Calendar,
  Plus,
  Clock,
  MapPin,
  User,
  Trash2,
  CheckCircle,
  AlertCircle,
  BookOpen
} from 'lucide-react';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

const Timetable = () => {
  const [classes, setClasses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [newClass, setNewClass] = useState({
    name: '',
    code: '',
    professor: '',
    location: '',
    dayOfWeek: 1,
    startTime: '',
    endTime: '',
    color: COLORS[0],
    semester: '',
    credits: null,
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setError('');
      const data = await timetableAPI.getAll();
      setClasses(data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load classes');
      setIsLoading(false);
    }
  };

  const addClass = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const created = await timetableAPI.create(newClass);
      setClasses([...classes, created]);
      setNewClass({
        name: '',
        code: '',
        professor: '',
        location: '',
        dayOfWeek: 1,
        startTime: '',
        endTime: '',
        color: COLORS[0],
        semester: '',
        credits: null,
      });
      setShowAddForm(false);
    } catch (err) {
      setError('Failed to create class');
    }
  };

  const deleteClass = async (id) => {
    try {
      await timetableAPI.delete(id);
      setClasses(classes.filter(c => c.id !== id));
    } catch (err) {
      setError('Failed to delete class');
    }
  };

  const renderWeeklyGrid = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2 mt-6">
        {DAYS.map((day, dayIndex) => (
          <div key={day} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">{day}</h3>
            <div className="space-y-2">
              {classes
                .filter(c => c.dayOfWeek === dayIndex)
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map(classItem => (
                  <motion.div
                    key={classItem.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-2 rounded-lg text-xs"
                    style={{ backgroundColor: classItem.color + '20', borderLeft: `3px solid ${classItem.color}` }}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">{classItem.name}</div>
                    <div className="text-gray-600 dark:text-gray-300 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {classItem.startTime} - {classItem.endTime}
                    </div>
                    {classItem.location && (
                      <div className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {classItem.location}
                      </div>
                    )}
                    <button
                      onClick={() => deleteClass(classItem.id)}
                      className="mt-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <div className="p-6">
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
          >
            Class Timetable
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your weekly class schedule
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-600 dark:text-red-400">{error}</span>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="mb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Class</span>
        </motion.button>

        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Class</h3>
            <form onSubmit={addClass} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={newClass.name}
                onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                required
                className="input"
                placeholder="Class Name *"
              />
              <input
                type="text"
                value={newClass.code}
                onChange={(e) => setNewClass({ ...newClass, code: e.target.value })}
                className="input"
                placeholder="Course Code"
              />
              <input
                type="text"
                value={newClass.professor}
                onChange={(e) => setNewClass({ ...newClass, professor: e.target.value })}
                className="input"
                placeholder="Professor"
              />
              <input
                type="text"
                value={newClass.location}
                onChange={(e) => setNewClass({ ...newClass, location: e.target.value })}
                className="input"
                placeholder="Location/Room"
              />
              <select
                value={newClass.dayOfWeek}
                onChange={(e) => setNewClass({ ...newClass, dayOfWeek: parseInt(e.target.value) })}
                className="input"
              >
                {DAYS.map((day, index) => (
                  <option key={day} value={index}>{day}</option>
                ))}
              </select>
              <select
                value={newClass.color}
                onChange={(e) => setNewClass({ ...newClass, color: e.target.value })}
                className="input"
              >
                {COLORS.map(color => (
                  <option key={color} value={color} style={{ backgroundColor: color }}>
                    {color}
                  </option>
                ))}
              </select>
              <input
                type="time"
                value={newClass.startTime}
                onChange={(e) => setNewClass({ ...newClass, startTime: e.target.value })}
                required
                className="input"
                placeholder="Start Time *"
              />
              <input
                type="time"
                value={newClass.endTime}
                onChange={(e) => setNewClass({ ...newClass, endTime: e.target.value })}
                required
                className="input"
                placeholder="End Time *"
              />
              <div className="md:col-span-2 flex gap-2">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">
                  Add Class
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

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : classes.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No classes yet</h3>
            <p className="text-gray-600 dark:text-gray-300">Add your first class to get started!</p>
          </div>
        ) : (
          renderWeeklyGrid()
        )}
      </div>
    </div>
  );
};

export default Timetable;
