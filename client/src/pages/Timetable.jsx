import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { timetableAPI } from '../utils/api';
import {
  Calendar,
  Plus,
  Clock,
  MapPin,
  Trash2,
  AlertCircle
} from 'lucide-react';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const COLORS = ['#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#E5E5E5'];

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
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mt-6">
        {DAYS.map((day, dayIndex) => (
          <div key={day} className="glass-card rounded-xl p-4 min-h-[200px]">
            <h3 className="font-bold text-sm mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">{day}</h3>
            <div className="space-y-3">
              {classes
                .filter(c => c.dayOfWeek === dayIndex)
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map(classItem => (
                  <motion.div
                    key={classItem.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 rounded-lg text-xs bg-gray-50 dark:bg-gray-800 border-l-4 border-black dark:border-white shadow-sm"
                  >
                    <div className="font-bold text-base mb-1">{classItem.name}</div>
                    <div className="text-gray-500 flex items-center gap-1 mb-1">
                      <Clock className="w-3 h-3" />
                      {classItem.startTime} - {classItem.endTime}
                    </div>
                    {classItem.location && (
                      <div className="text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {classItem.location}
                      </div>
                    )}
                    <button
                      onClick={() => deleteClass(classItem.id)}
                      className="mt-2 text-gray-400 hover:text-red-500 transition-colors w-full text-right"
                    >
                      <Trash2 className="w-3 h-3 inline-block" />
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
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />
      <div className="p-6 max-w-[1600px] mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-2 tracking-tight"
            >
              Class Timetable
            </motion.h1>
            <p className="text-gray-500">
              Manage your weekly class schedule
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn btn-primary px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Class</span>
          </motion.button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-600 dark:text-red-400">{error}</span>
          </div>
        )}

        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold mb-4">Add New Class</h3>
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
              <div className="md:col-span-2 flex gap-3 pt-2">
                <button type="submit" className="btn btn-primary px-6 py-2 rounded-lg">
                  Add Class
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

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : classes.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-3xl">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No classes yet</h3>
            <p className="text-gray-500 mb-6">Add your first class to get started!</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn btn-primary px-6 py-2 rounded-lg"
            >
              Add Class
            </button>
          </div>
        ) : (
          renderWeeklyGrid()
        )}
      </div>
    </div>
  );
};

export default Timetable;
