import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Target, Heart, Brain, Award, Globe, Zap, Sun, Moon, Coffee, Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const values = [
    {
      icon: Target,
      title: 'Student-First',
      description: 'Every feature is designed with student needs in mind, from academic success to personal growth.',
    },
    {
      icon: Heart,
      title: 'Well-being Focus',
      description: 'We believe in holistic student development, balancing academics with mental health and life skills.',
    },
    {
      icon: Brain,
      title: 'Innovation',
      description: 'Constantly evolving our platform with cutting-edge technology and user feedback.',
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making student life management accessible to students worldwide, regardless of background.',
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-black/5 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-black dark:text-white hover:opacity-70 transition-opacity sm:hidden"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white dark:bg-black rounded-full"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold tracking-tight">Cumpas Sync</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tighter"
          >
            About Cumpas Sync
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-500 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            We're on a mission to revolutionize how students manage their academic and personal lives,
            making success more accessible and achievable for everyone.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">Our Mission</h2>
              <p className="text-lg text-gray-500 mb-6 leading-relaxed">
                Cumpas Sync was born from the realization that student life is more complex than ever.
                Between managing academics, finances, personal habits, and future goals, students need
                a unified platform that grows with them.
              </p>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                We believe that with the right tools and support, every student can achieve their
                full potential. Our platform combines habit tracking, financial management,
                study organization, and goal setting into one seamless experience.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white dark:text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Student Success</h3>
                  <p className="text-gray-500">Our primary focus</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="w-full h-80 bg-black dark:bg-white rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="w-32 h-32 text-white/20 dark:text-black/20" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Our Values</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              These core principles guide everything we do at Cumpas Sync.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl hover:border-black/20 dark:hover:border-white/20 transition-all"
              >
                <div className="w-12 h-12 mx-auto mb-6 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <value.icon className="w-6 h-6 text-black dark:text-white" />
                </div>
                <h3 className="text-xl font-bold text-center mb-3">{value.title}</h3>
                <p className="text-gray-500 text-center leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer & Buy Coffee Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 rounded-3xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>

            <div className="mb-8 relative inline-block">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-black shadow-xl mx-auto">
                {/* Placeholder for Petos Asegid's image - using a generic avatar for now or a placeholder URL */}
                <img
                  src="https://ui-avatars.com/api/?name=Petos+Asegid&background=000&color=fff&size=256"
                  alt="Petos Asegid"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-black dark:bg-white text-white dark:text-black p-2 rounded-full shadow-lg">
                <Zap className="w-4 h-4" />
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight">Petos Asegid</h2>
            <p className="text-lg font-medium text-gray-500 mb-6 uppercase tracking-widest">Lead Developer & Creator</p>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              "I built Cumpas Sync to help students like myself navigate the complexities of university life.
              If this project has helped you, consider buying me a coffee to support future updates!"
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a href="#" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFDD00] text-black font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
              onClick={() => window.open('https://www.buymeacoffee.com/', '_blank')}
            >
              <Coffee className="w-6 h-6" />
              Buy me a Coffee
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-2 tracking-tighter">10k+</div>
              <p className="text-gray-500 uppercase tracking-wider text-sm">Active Students</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-2 tracking-tighter">95%</div>
              <p className="text-gray-500 uppercase tracking-wider text-sm">Goal Achievement</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-2 tracking-tighter">50+</div>
              <p className="text-gray-500 uppercase tracking-wider text-sm">Universities</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-2 tracking-tighter">4.9</div>
              <p className="text-gray-500 uppercase tracking-wider text-sm">User Rating</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black dark:bg-white text-white dark:text-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">Ready to Join Us?</h2>
            <p className="text-xl opacity-80 mb-10 max-w-2xl mx-auto">
              Be part of the community that's transforming student life management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/create-account')}
                className="px-8 py-4 bg-white dark:bg-black text-black dark:text-white rounded-xl font-bold hover:scale-105 transition-transform"
              >
                Get Started Free
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 border border-white/20 dark:border-black/20 rounded-xl font-bold hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
