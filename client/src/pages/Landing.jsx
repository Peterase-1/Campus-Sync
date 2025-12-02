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
  Shield,
  Zap,
  Globe,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import Hero3D from '../components/Hero3D';

const Landing = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Target,
      title: 'Habit Garden',
      description: 'Cultivate positive habits with our tracking system',
      color: 'text-black dark:text-white'
    },
    {
      icon: DollarSign,
      title: 'Finance Center',
      description: 'Track expenses and manage your student budget',
      color: 'text-black dark:text-white'
    },
    {
      icon: BookOpen,
      title: 'Study Desk',
      description: 'Organize notes and tasks for academic success',
      color: 'text-black dark:text-white'
    },
    {
      icon: Star,
      title: 'Life Goals',
      description: 'Set and track your personal and academic goals',
      color: 'text-black dark:text-white'
    }
  ];

  const stats = [
    { number: '10k+', label: 'Active Students' },
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
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white dark:text-black" />
              </div>
              <span className="text-xl font-bold tracking-tight">Cumpas Sync</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Features</button>
              <button onClick={() => navigate('/about')} className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors">About</button>
              <button onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Testimonials</button>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {isAuthenticated ? (
                <motion.button
                  onClick={() => navigate('/app')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary px-6 py-2.5"
                >
                  Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              ) : (
                <div className="hidden sm:flex items-center space-x-3">
                  <button onClick={() => navigate('/login')} className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Login</button>
                  <motion.button
                    onClick={() => navigate('/create-account')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary px-6 py-2.5"
                  >
                    Get Started
                  </motion.button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden border-t border-black/5 dark:border-white/5 bg-white dark:bg-black"
          >
            <div className="px-4 py-6 space-y-4">
              <button onClick={() => { document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-lg font-medium">Features</button>
              <button onClick={() => { navigate('/about'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-lg font-medium">About</button>
              <button onClick={() => { document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-lg font-medium">Testimonials</button>
              {!isAuthenticated && (
                <div className="pt-4 space-y-3">
                  <button onClick={() => navigate('/login')} className="block w-full btn btn-secondary py-3">Login</button>
                  <button onClick={() => navigate('/create-account')} className="block w-full btn btn-primary py-3">Get Started</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left z-10"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                Master Your <br />
                <span className="text-gray-500 dark:text-gray-400">Student Life.</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                The all-in-one workspace for your habits, finances, and academic success. Minimalist, powerful, and designed for focus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={() => navigate(isAuthenticated ? '/app' : '/create-account')} className="btn btn-primary px-8 py-4 text-lg">
                  {isAuthenticated ? 'Go to Dashboard' : 'Start for Free'}
                </button>
                <button className="btn btn-secondary px-8 py-4 text-lg">
                  View Demo
                </button>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Secure
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Fast
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Global
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative h-[450px] lg:h-[600px] w-full flex items-center justify-center lg:-mr-[300px]"
            >
              <Hero3D />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-black/5 dark:border-white/5 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">Essential Tools</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Everything you need to organize your academic journey in one cohesive interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-3xl border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-black"
              >
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 bg-black text-white dark:bg-white dark:text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">Student Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-3xl border border-white/20 dark:border-black/20 bg-white/5 dark:bg-black/5 backdrop-blur-sm"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-lg mb-6 leading-relaxed opacity-90">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm opacity-60">{testimonial.university}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
            Ready to Focus?
          </h2>
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
            Join the community of students who are mastering their time and finances.
          </p>
          <button
            onClick={() => navigate(isAuthenticated ? '/app' : '/create-account')}
            className="btn btn-primary px-10 py-5 text-lg rounded-full"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started Now'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 dark:border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white dark:text-black" />
            </div>
            <span className="font-bold">Cumpas Sync</span>
          </div>
          <div className="text-sm text-gray-500">
            &copy; 2025 Cumpas Sync. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Privacy</a>
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Terms</a>
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
