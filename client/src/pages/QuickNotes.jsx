import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { notesAPI } from '../utils/api';
import {
  Plus,
  Search,
  Pin,
  Trash2,
  Archive,
  Tag
} from 'lucide-react';

const QuickNotes = () => {
  const [notes, setNotes] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: [],
    color: '#10b981',
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const data = await notesAPI.getAll();
      setNotes(data);
    } catch (err) {
      console.error('Failed to fetch notes');
    }
  };

  const addNote = async (e) => {
    e.preventDefault();
    try {
      const created = await notesAPI.create(newNote);
      setNotes([created, ...notes]);
      setNewNote({ title: '', content: '', tags: [], color: '#10b981' });
      setShowAddForm(false);
    } catch (err) {
      console.error('Failed to create note');
    }
  };

  const togglePin = async (note) => {
    try {
      const updated = await notesAPI.update(note.id, { pinned: !note.pinned });
      setNotes(notes.map(n => n.id === note.id ? updated : n));
    } catch (err) {
      console.error('Failed to pin note');
    }
  };

  const deleteNote = async (id) => {
    try {
      await notesAPI.delete(id);
      setNotes(notes.filter(n => n.id !== id));
    } catch (err) {
      console.error('Failed to delete note');
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <div className="p-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
        >
          Quick Notes 📝
        </motion.h1>

        {/* Search & Add */}
        <div className="max-w-4xl mx-auto mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Search notes..."
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold shadow-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Note
          </motion.button>
        </div>

        {/* Add Note Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <form onSubmit={addNote} className="space-y-4">
              <input
                type="text"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Note Title"
              />
              <textarea
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows="6"
                placeholder="Write your note here..."
              />
              <div className="flex gap-2">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">
                  Save Note
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

        {/* Notes Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 relative"
            >
              {note.pinned && (
                <Pin className="absolute top-2 right-2 w-4 h-4 text-yellow-500 fill-current" />
              )}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{note.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{note.content}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{new Date(note.createdAt).toLocaleDateString()}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => togglePin(note)}
                    className={`p-1 rounded ${note.pinned ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-600`}
                  >
                    <Pin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-1 rounded text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No notes found</h3>
            <p className="text-gray-600 dark:text-gray-300">Create your first note to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickNotes;
