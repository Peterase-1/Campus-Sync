import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';
import {
  Plus,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  Target,
  Calendar,
  Edit3,
  Trash2,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const FinanceCenter = () => {
  const { user, updateUserData } = useUser();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense',
    amount: '',
    description: '',
    category: 'food'
  });

  const finances = {
    totalIncome: user?.data?.finances?.totalIncome || 0,
    totalExpenses: user?.data?.finances?.totalExpenses || 0,
    totalSavings: user?.data?.finances?.totalSavings || 0,
    transactions: user?.data?.finances?.transactions || [],
    goals: user?.data?.finances?.goals || []
  };

  const addTransaction = () => {
    if (newTransaction.amount && newTransaction.description) {
      const transaction = {
        id: Date.now(),
        type: newTransaction.type,
        amount: parseFloat(newTransaction.amount),
        description: newTransaction.description,
        category: newTransaction.category,
        date: new Date().toISOString()
      };

      const updatedTransactions = [...finances.transactions, transaction];
      const totalIncome = updatedTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const totalExpenses = updatedTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      updateUserData('finances', {
        ...finances,
        transactions: updatedTransactions,
        totalIncome,
        totalExpenses,
        totalSavings: totalIncome - totalExpenses
      });

      setNewTransaction({ type: 'expense', amount: '', description: '', category: 'food' });
      setShowAddForm(false);
    }
  };

  const deleteTransaction = (transactionId) => {
    const updatedTransactions = finances.transactions.filter(t => t.id !== transactionId);
    const totalIncome = updatedTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = updatedTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    updateUserData('finances', {
      ...finances,
      transactions: updatedTransactions,
      totalIncome,
      totalExpenses,
      totalSavings: totalIncome - totalExpenses
    });
  };

  const categories = [
    { id: 'food', name: 'Food & Dining', color: 'bg-red-500' },
    { id: 'transport', name: 'Transportation', color: 'bg-blue-500' },
    { id: 'entertainment', name: 'Entertainment', color: 'bg-purple-500' },
    { id: 'education', name: 'Education', color: 'bg-green-500' },
    { id: 'health', name: 'Health & Fitness', color: 'bg-pink-500' },
    { id: 'shopping', name: 'Shopping', color: 'bg-yellow-500' },
    { id: 'other', name: 'Other', color: 'bg-gray-500' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
          >
            Finance Center 💰
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your income, expenses, and build healthy financial habits!
          </p>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Income</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${(finances.totalIncome || 0).toFixed(2)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${(finances.totalExpenses || 0).toFixed(2)}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Savings</p>
                <p className={`text-2xl font-bold ${finances.totalSavings >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                  ${(finances.totalSavings || 0).toFixed(2)}
                </p>
              </div>
              <Wallet className="w-8 h-8 text-blue-600" />
            </div>
          </motion.div>
        </div>

        {/* Add Transaction Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Transaction</span>
        </motion.button>

        {/* Add Transaction Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Transaction</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type
                </label>
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What was this for?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <button
                onClick={addTransaction}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Add Transaction
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Transactions List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Transactions</h3>
          {finances.transactions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No transactions yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start tracking your income and expenses to manage your finances better!
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Add Your First Transaction
              </button>
            </motion.div>
          ) : (
            finances.transactions
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((transaction, index) => {
                const category = categories.find(c => c.id === transaction.category);
                return (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${category?.color} rounded-xl flex items-center justify-center`}>
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {transaction.description}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {category?.name} • {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className={`text-lg font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {transaction.type === 'income' ? '+' : '-'}${(transaction.amount || 0).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {transaction.type === 'income' ? 'Income' : 'Expense'}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteTransaction(transaction.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
};

export default FinanceCenter;