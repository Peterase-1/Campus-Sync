import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { pomodoroAPI } from '../utils/api';
import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  BarChart3,
  Coffee
} from 'lucide-react';

const Pomodoro = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [sessionType, setSessionType] = useState('work'); // 'work' or 'break'
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSessionComplete();
            return sessionType === 'work' ? 5 * 60 : 25 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, sessionType]);

  const fetchStats = async () => {
    try {
      const data = await pomodoroAPI.getStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats');
    }
  };

  const startSession = async () => {
    try {
      const session = await pomodoroAPI.createSession({
        taskName: taskName || 'Untitled',
        duration: sessionType === 'work' ? 25 : 5,
        type: sessionType,
      });
      setCurrentSessionId(session.id);
      setIsRunning(true);
    } catch (err) {
      console.error('Failed to start session');
    }
  };

  const handleSessionComplete = async () => {
    setIsRunning(false);
    if (currentSessionId) {
      try {
        await pomodoroAPI.completeSession(currentSessionId);
        fetchStats();
        setSessionType(prev => prev === 'work' ? 'break' : 'work');
      } catch (err) {
        console.error('Failed to complete session');
      }
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(sessionType === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = sessionType === 'work'
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <div className="p-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
        >
          Pomodoro Timer
        </motion.h1>

        <div className="max-w-2xl mx-auto">
          {/* Timer Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-8 mb-6"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-sm mb-4">
                {sessionType === 'work' ? <Clock className="w-5 h-5 text-green-600" /> : <Coffee className="w-5 h-5 text-blue-600" />}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {sessionType === 'work' ? 'Focus Session' : 'Break Time'}
                </span>
              </div>
            </div>

            {/* Circular Progress & Time */}
            <div className="relative w-72 h-72 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="144"
                  cy="144"
                  r="128"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="144"
                  cy="144"
                  r="128"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 128}`}
                  strokeDashoffset={`${2 * Math.PI * 128 * (1 - progress / 100)}`}
                  className={sessionType === 'work' ? 'text-green-600' : 'text-blue-600'}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {Math.round(progress)}% Complete
                  </div>
                </div>
              </div>
            </div>

            {/* Task Input */}
            {!isRunning && (
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="w-full mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="What are you working on?"
              />
            )}

            {/* Controls */}
            <div className="flex justify-center gap-4">
              {!isRunning ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startSession}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Start
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsRunning(false)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2"
                >
                  <Pause className="w-5 h-5" />
                  Pause
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetTimer}
                className="bg-gray-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <BarChart3 className="w-6 h-6 text-green-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSessions}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Sessions</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <Clock className="w-6 h-6 text-blue-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalHours}h</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Hours</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <Play className="w-6 h-6 text-green-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.workSessions}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Work Sessions</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <Coffee className="w-6 h-6 text-orange-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.breakSessions}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Break Sessions</div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
