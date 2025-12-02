import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { notesAPI } from '../utils/api';
import {
  Plus,
  Search,
  Pin,
  Trash2,
} from 'lucide-react';

const QuickNotes = () => {
  const [notes, setNotes] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: [],
    color: '#ffffff',
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
      setNewNote({ title: '', content: '', tags: [], color: '#ffffff' });
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
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 tracking-tight"
        >
          Quick Notes
        </motion.h1>

        {/* Search & Add */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
              placeholder="Search notes..."
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn btn-primary px-6 py-2 rounded-xl flex items-center gap-2 justify-center"
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
            className="mb-8 glass-card rounded-2xl p-6"
          >
            <form onSubmit={addNote} className="space-y-4">
              <input
                type="text"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                required
                className="input font-bold text-lg"
                placeholder="Note Title"
              />
              <textarea
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                required
                className="input resize-none"
                rows="6"
                placeholder="Write your note here..."
              />
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn btn-primary px-6 py-2 rounded-lg">
                  Save Note
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

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-2xl p-6 relative group hover:border-black/20 dark:hover:border-white/20 transition-all"
            >
              {note.pinned && (
                <Pin className="absolute top-4 right-4 w-4 h-4 text-black dark:text-white fill-current" />
              )}
              <h3 className="text-lg font-bold mb-2 pr-8">{note.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-4 whitespace-pre-wrap">{note.content}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className="text-xs text-gray-400">{new Date(note.createdAt).toLocaleDateString()}</span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => togglePin(note)}
                    className={`p-2 rounded-lg transition-colors ${note.pinned ? 'text-black dark:text-white bg-gray-100 dark:bg-gray-800' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}
                    title={note.pinned ? "Unpin" : "Pin"}
                  >
                    <Pin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12 glass-card rounded-3xl">
            <h3 className="text-xl font-bold mb-2">No notes found</h3>
            <p className="text-gray-500">Create your first note to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickNotes;
