import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';
import {
  Plus,
  BookOpen,
  CheckCircle,
  Clock,
  Calendar,
  Edit3,
  Trash2,
  FileText,
  Target,
  Star,
  AlertCircle
} from 'lucide-react';

const StudyDesk = () => {
  const { user, updateUserData } = useUser();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', subject: '' });
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium', dueDate: '' });

  const studies = user?.data?.studies || {
    notes: [],
    tasks: [],
    reminders: []
  };

  const addNote = () => {
    if (newNote.title.trim()) {
      const note = {
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
        subject: newNote.subject,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      updateUserData('studies', {
        ...studies,
        notes: [...studies.notes, note]
      });
      setNewNote({ title: '', content: '', subject: '' });
      setShowAddForm(false);
    }
  };

  const addTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        completed: false,
        createdAt: new Date().toISOString()
      };

      updateUserData('studies', {
        ...studies,
        tasks: [...studies.tasks, task]
      });
      setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
    }
  };

  const toggleTask = (taskId) => {
    const updatedTasks = studies.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    updateUserData('studies', { ...studies, tasks: updatedTasks });
  };

  const deleteNote = (noteId) => {
    const updatedNotes = studies.notes.filter(note => note.id !== noteId);
    updateUserData('studies', { ...studies, notes: updatedNotes });
  };

  const deleteTask = (taskId) => {
    const updatedTasks = studies.tasks.filter(task => task.id !== taskId);
    updateUserData('studies', { ...studies, tasks: updatedTasks });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-2 tracking-tight"
          >
            Study Desk
          </motion.h1>
          <p className="text-gray-500">
            Organize your notes, tasks, and study materials in one place
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Notes</p>
                <p className="text-3xl font-bold">{studies.notes.length}</p>
              </div>
              <div className="p-3 bg-black dark:bg-white rounded-xl">
                <BookOpen className="w-6 h-6 text-white dark:text-black" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Completed Tasks</p>
                <p className="text-3xl font-bold">
                  {studies.tasks.filter(t => t.completed).length}
                </p>
              </div>
              <div className="p-3 bg-black dark:bg-white rounded-xl">
                <CheckCircle className="w-6 h-6 text-white dark:text-black" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Pending Tasks</p>
                <p className="text-3xl font-bold">
                  {studies.tasks.filter(t => !t.completed).length}
                </p>
              </div>
              <div className="p-3 bg-black dark:bg-white rounded-xl">
                <AlertCircle className="w-6 h-6 text-white dark:text-black" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Add Buttons */}
        <div className="flex space-x-4 mb-6">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm('note')}
            className="btn btn-primary px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Note</span>
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm('task')}
            className="btn btn-secondary px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Task</span>
          </motion.button>
        </div>

        {/* Add Forms */}
        {showAddForm === 'note' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold mb-4">Add New Note</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Note Title
                </label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="input"
                  placeholder="e.g., Calculus Chapter 5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={newNote.subject}
                  onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })}
                  className="input"
                  placeholder="e.g., Mathematics"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Content
                </label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  rows={4}
                  className="input"
                  placeholder="Write your notes here..."
                />
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={addNote}
                  className="btn btn-primary px-6 py-2 rounded-lg"
                >
                  Add Note
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="btn btn-secondary px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {showAddForm === 'task' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold mb-4">Add New Task</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="input"
                  placeholder="e.g., Complete math homework"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="input"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  rows={3}
                  className="input"
                  placeholder="Task details..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="input"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-4 pt-2">
              <button
                onClick={addTask}
                className="btn btn-primary px-6 py-2 rounded-lg"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="btn btn-secondary px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Notes Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Study Notes</h3>
          {studies.notes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 glass-card rounded-3xl"
            >
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                No notes yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start organizing your study materials!
              </p>
              <button
                onClick={() => setShowAddForm('note')}
                className="btn btn-primary px-6 py-2 rounded-lg"
              >
                Add Your First Note
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studies.notes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6 group hover:border-black/20 dark:hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold mb-1">
                        {note.title}
                      </h4>
                      <p className="text-sm text-gray-500 mb-2">
                        {note.subject}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {note.content}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Tasks Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Study Tasks</h3>
          {studies.tasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 glass-card rounded-3xl"
            >
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start organizing your study tasks!
              </p>
              <button
                onClick={() => setShowAddForm('task')}
                className="btn btn-primary px-6 py-2 rounded-lg"
              >
                Add Your First Task
              </button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {studies.tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`glass-card rounded-2xl p-6 group hover:border-black/20 dark:hover:border-white/20 transition-all ${task.completed ? 'opacity-75' : ''
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.completed
                          ? 'bg-black border-black text-white dark:bg-white dark:border-white dark:text-black'
                          : 'border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white'
                          }`}
                      >
                        {task.completed && <CheckCircle className="w-4 h-4" />}
                      </button>
                      <div className="flex-1">
                        <h4 className={`text-lg font-bold ${task.completed ? 'line-through text-gray-400' : ''
                          }`}>
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className="text-gray-500 text-sm mt-1">
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-4 mt-2">
                          <span className={`px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500`}>
                            {task.priority}
                          </span>
                          {task.dueDate && (
                            <span className="text-xs text-gray-400 flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyDesk;