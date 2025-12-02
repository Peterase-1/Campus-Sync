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
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 tracking-tight text-center"
        >
          Pomodoro Timer
        </motion.h1>

        <div className="max-w-2xl mx-auto">
          {/* Timer Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-8 mb-8 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800">
              <motion.div
                className="h-full bg-black dark:bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 mb-8">
              {sessionType === 'work' ? <Clock className="w-5 h-5" /> : <Coffee className="w-5 h-5" />}
              <span className="font-semibold">
                {sessionType === 'work' ? 'Focus Session' : 'Break Time'}
              </span>
            </div>

            <div className="text-8xl font-bold mb-8 tabular-nums tracking-tighter">
              {formatTime(timeLeft)}
            </div>

            {/* Task Input */}
            {!isRunning && (
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="w-full max-w-md mb-8 input text-center text-lg"
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
                  className="btn btn-primary px-8 py-3 rounded-xl flex items-center gap-2 text-lg"
                >
                  <Play className="w-5 h-5" />
                  Start
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsRunning(false)}
                  className="btn btn-secondary px-8 py-3 rounded-xl flex items-center gap-2 text-lg"
                >
                  <Pause className="w-5 h-5" />
                  Pause
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetTimer}
                className="btn btn-secondary px-8 py-3 rounded-xl flex items-center gap-2 text-lg"
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
              <div className="glass-card rounded-xl p-4 text-center">
                <BarChart3 className="w-6 h-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.totalSessions}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Sessions</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <Clock className="w-6 h-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.totalHours}h</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Hours</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <Play className="w-6 h-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.workSessions}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Work</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <Coffee className="w-6 h-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.breakSessions}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Breaks</div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
