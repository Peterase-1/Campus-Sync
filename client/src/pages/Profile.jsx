import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';
import {
  User,
  Mail,
  Save,
  AlertCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';

const Profile = () => {
  const { user, updateUserData } = useUser();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Here you would normally call an API to update the profile
      // For now, we'll just update the local user data
      updateUserData('name', formData.name);
      updateUserData('email', formData.email);

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
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
            Profile Settings
          </motion.h1>
          <p className="text-gray-500">
            Manage your account information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass-card rounded-2xl p-8"
          >
            {/* Avatar Section */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
              <div className="w-24 h-24 bg-black dark:bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white dark:text-black font-bold text-4xl">
                  {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold">{formData.name || 'User'}</h2>
                <p className="text-gray-500">Student Account</p>
              </div>
            </div>

            {/* Message Display */}
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success'
                  ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-black/10 dark:border-white/10'
                  : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
                  }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span className="font-medium">
                  {message.text}
                </span>
              </motion.div>
            )}

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="input pl-11"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="input pl-11"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Info about password */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 flex items-start gap-3">
                <Lock className="w-5 h-5 text-gray-500 mt-0.5" />
                <div className="text-sm text-gray-500">
                  <p className="font-bold text-black dark:text-white mb-1">Password Management</p>
                  <p>Contact support to change your password for security purposes.</p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </motion.div>

          {/* Account Stats */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <p className="text-sm text-gray-500 mb-1">Member Since</p>
              <p className="text-xl font-bold">
                {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6"
            >
              <p className="text-sm text-gray-500 mb-1">Account Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="text-xl font-bold">Active</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-6"
            >
              <p className="text-sm text-gray-500 mb-1">Account Type</p>
              <p className="text-xl font-bold">Student Plan</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
