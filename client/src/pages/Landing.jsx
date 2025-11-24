import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Sun,
  Moon,
  Target,
  DollarSign,
  BookOpen,
  Star,
  ArrowRight,
  CheckCircle,
  Users,
  Shield,
  Zap,
  Heart,
  Brain,
  Award,
  Globe,
  BarChart3,
  Clock,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const Landing = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Target,
      title: 'Habit Garden',
      description: 'Cultivate positive habits with our gamified plant-growing system',
      color: 'text-green-600'
    },
    {
      icon: DollarSign,
      title: 'Finance Center',
      description: 'Track expenses, set savings goals, and manage your student budget',
      color: 'text-green-600'
    },
    {
      icon: BookOpen,
      title: 'Study Desk',
      description: 'Organize notes, tasks, and resources for academic success',
      color: 'text-green-600'
    },
    {
      icon: Star,
      title: 'Life Goals',
      description: 'Set and track your personal and academic goals',
      color: 'text-green-600'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Students' },
    { number: '95%', label: 'Success Rate' },
    { number: '24/7', label: 'Support' },
    { number: '50+', label: 'Universities' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      university: 'MIT',
      text: 'Cumpas Sync transformed my student life. I\'m more organized and productive than ever!',
      rating: 5
    },
    {
      name: 'Ahmed Hassan',
      university: 'Stanford',
      text: 'The habit tracking feature helped me build consistent study routines.',
      rating: 5
    },
    {
      name: 'Maria Garcia',
      university: 'Harvard',
      text: 'Managing my finances as a student has never been easier. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass backdrop-blur-xl border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl sm:text-2xl font-bold gradient-text">Cumpas Sync</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Student Life Manager</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-2 lg:space-x-8">
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-black dark:text-white hover:text-green-600 transition-colors"
              >
                <span className="hidden lg:inline">Features</span>
                <span className="lg:hidden">Features</span>
              </button>
              <button
                onClick={() => navigate('/about')}
                className="text-black dark:text-white hover:text-green-600 transition-colors"
              >
                <span className="hidden lg:inline">About</span>
                <span className="lg:hidden">About</span>
              </button>
              <button
                onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-black dark:text-white hover:text-green-600 transition-colors"
              >
                <span className="hidden lg:inline">Testimonials</span>
                <span className="lg:hidden">Testimonials</span>
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="text-black dark:text-white hover:text-green-600 transition-colors"
              >
                <span className="hidden lg:inline">Contact</span>
                <span className="lg:hidden">Contact</span>
              </button>
            </div>

            {/* Theme Toggle & CTA */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl glass hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {isAuthenticated ? (
                <motion.button
                  onClick={() => navigate('/app')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary px-3 sm:px-6 py-2 text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Welcome back, {user?.name}!</span>
                  <span className="sm:hidden">Welcome!</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              ) : (
                <motion.a
                  href="/create-account"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary px-3 sm:px-6 py-2 text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">Start</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.a>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl glass"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden glass border-t border-black/10 dark:border-white/10"
          >
            <div className="px-4 py-4 space-y-4">
              <button
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block text-black dark:text-white hover:text-green-600 transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => {
                  navigate('/about');
                  setMobileMenuOpen(false);
                }}
                className="block text-black dark:text-white hover:text-green-600 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => {
                  document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block text-black dark:text-white hover:text-green-600 transition-colors"
              >
                Testimonials
              </button>
              <button
                onClick={() => {
                  navigate('/contact');
                  setMobileMenuOpen(false);
                }}
                className="block text-black dark:text-white hover:text-green-600 transition-colors"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Illustrations - Hidden on mobile */}
        <div className="absolute inset-0 -z-10 hidden lg:block">
          {/* Modern floating elements */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl shadow-2xl"
          />
          <motion.div
            animate={{
              y: [0, 25, 0],
              rotate: [0, -8, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute top-40 right-20 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-xl"
          />
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
              rotate: [0, 15, 0]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl shadow-lg"
          />
          <motion.div
            animate={{
              y: [0, 30, 0],
              rotate: [0, -12, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
            className="absolute bottom-40 right-1/3 w-28 h-28 bg-gradient-to-br from-green-300 to-green-500 rounded-full shadow-2xl"
          />

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 3, delay: 1 }}
              d="M 100 150 Q 200 100 300 200 Q 400 300 500 250"
              stroke="url(#gradient1)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8,8"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 4, delay: 2 }}
              d="M 600 100 Q 700 200 800 150"
              stroke="url(#gradient2)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6,6"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              >
                Your Complete
                <span className="gradient-text block">Student Life Manager</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
              >
                Track habits, manage finances, organize studies, and achieve your goals all in one beautiful platform designed specifically for students.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                {isAuthenticated ? (
                  <button
                    onClick={() => navigate('/app')}
                    className="btn btn-primary px-8 py-4 text-lg group"
                  >
                    Welcome back, {user?.name}! 👋
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <a href="/create-account" className="btn btn-primary px-8 py-4 text-lg group">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
                <button className="btn btn-secondary px-8 py-4 text-lg">
                  Watch Demo
                </button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-8 text-sm text-gray-500 dark:text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-600" />
                  <span>Lightning Fast</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-green-600" />
                  <span>Available Worldwide</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Illustration - Hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              {/* Modern dashboard mockup */}
              <div className="relative w-full h-96 lg:h-[500px]">
                {/* Main dashboard card */}
                <motion.div
                  animate={{ y: [0, -15, 0], rotateY: [0, 2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-80 h-72 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 backdrop-blur-sm"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                      <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-20 mb-2"></div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-16"></div>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-4">
                      <div className="h-3 bg-green-600 rounded w-12 mb-2"></div>
                      <div className="h-2 bg-green-400 rounded w-8 mb-1"></div>
                      <div className="h-1 bg-green-300 rounded w-6"></div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-4">
                      <div className="h-3 bg-blue-600 rounded w-16 mb-2"></div>
                      <div className="h-2 bg-blue-400 rounded w-10 mb-1"></div>
                      <div className="h-1 bg-blue-300 rounded w-8"></div>
                    </div>
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-3">
                    <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 2, delay: 1 }}
                        className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                      ></motion.div>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{ duration: 2, delay: 1.5 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating feature cards */}
                <motion.div
                  animate={{ y: [0, 20, 0], rotate: [0, 8, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-8 right-8 w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl shadow-xl flex items-center justify-center"
                >
                  <Target className="w-10 h-10 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -25, 0], rotate: [0, -5, 0], scale: [1, 0.95, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute bottom-16 right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl shadow-xl flex items-center justify-center"
                >
                  <DollarSign className="w-12 h-12 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0], rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-8 left-8 w-18 h-18 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-lg flex items-center justify-center"
                >
                  <BookOpen className="w-9 h-9 text-white" />
                </motion.div>

                {/* Animated connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.4 }}
                    transition={{ duration: 3, delay: 1 }}
                    d="M 200 120 Q 300 80 400 140 Q 500 200 600 160"
                    stroke="url(#gradient3)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="10,10"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 4, delay: 2 }}
                    d="M 100 200 Q 200 150 300 180"
                    stroke="url(#gradient4)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8,8"
                  />
                  <defs>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-50 dark:bg-green-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to succeed as a student, beautifully organized in one place.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-olive-100 dark:bg-olive-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-olive-200 dark:group-hover:bg-olive-900/50 transition-colors">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-green-50 dark:bg-green-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Students Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of successful students who transformed their academic life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.university}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="card"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Student Life?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of students who are already succeeding with Cumpas Sync.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <button
                  onClick={() => navigate('/app')}
                  className="btn btn-primary px-8 py-4 text-lg"
                >
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <a href="/create-account" className="btn btn-primary px-8 py-4 text-lg">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              )}
              <button className="btn btn-secondary px-8 py-4 text-lg">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black dark:bg-white text-white dark:text-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Cumpas Sync</span>
              </div>
              <p className="text-gray-400 dark:text-gray-600">
                Your complete student life management platform.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400 dark:text-gray-600">
                <li>
                  <button
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-green-600 transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/app')}
                    className="hover:text-green-600 transition-colors"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/create-account')}
                    className="hover:text-green-600 transition-colors"
                  >
                    Get Started
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 dark:text-gray-600">
                <li>
                  <button
                    onClick={() => navigate('/about')}
                    className="hover:text-green-600 transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-green-600 transition-colors"
                  >
                    Testimonials
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/contact')}
                    className="hover:text-green-600 transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Settings</h3>
              <ul className="space-y-2 text-gray-400 dark:text-gray-600">
                <li>
                  <button
                    onClick={toggleTheme}
                    className="hover:text-green-600 transition-colors"
                  >
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </li>
                <li><span className="text-gray-500">Privacy Policy</span></li>
                <li><span className="text-gray-500">Terms of Service</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 dark:border-gray-200 mt-8 pt-8 text-center text-gray-400 dark:text-gray-600">
            <p>&copy; 2025 Cumpas Sync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
