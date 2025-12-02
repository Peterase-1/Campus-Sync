import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';
import {
  Plus,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  Trash2,
} from 'lucide-react';
import { financeAPI } from '../utils/api';

const FinanceCenter = () => {
  const { user } = useUser();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense',
    amount: '',
    description: '',
    category: 'food',
  });
  const [transactions, setTransactions] = useState([]);

  // Load transactions from DB on mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await financeAPI.getTransactions();
        setTransactions(data);
      } catch (e) {
        console.error('Failed to load transactions', e);
      }
    };
    fetchTransactions();
  }, []);

  // Compute totals from transactions
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalSavings = totalIncome - totalExpenses;

  const addTransaction = async () => {
    if (!newTransaction.amount || !newTransaction.description) return;
    try {
      const created = await financeAPI.createTransaction({
        ...newTransaction,
        amount: parseFloat(newTransaction.amount),
        date: new Date().toISOString(),
      });
      setTransactions(prev => [...prev, created]);
      setNewTransaction({ type: 'expense', amount: '', description: '', category: 'food' });
      setShowAddForm(false);
    } catch (e) {
      console.error('Failed to create transaction', e);
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      await financeAPI.deleteTransaction(transactionId);
      setTransactions(prev => prev.filter(t => t.id !== transactionId));
    } catch (e) {
      console.error('Failed to delete transaction', e);
    }
  };

  const categories = [
    { id: 'food', name: 'Food & Dining', color: 'bg-gray-100 dark:bg-gray-800' },
    { id: 'transport', name: 'Transportation', color: 'bg-gray-100 dark:bg-gray-800' },
    { id: 'entertainment', name: 'Entertainment', color: 'bg-gray-100 dark:bg-gray-800' },
    { id: 'education', name: 'Education', color: 'bg-gray-100 dark:bg-gray-800' },
    { id: 'health', name: 'Health & Fitness', color: 'bg-gray-100 dark:bg-gray-800' },
    { id: 'shopping', name: 'Shopping', color: 'bg-gray-100 dark:bg-gray-800' },
    { id: 'other', name: 'Other', color: 'bg-gray-100 dark:bg-gray-800' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />
      <div className="p-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-2 tracking-tight"
          >
            Finance Center
          </motion.h1>
          <p className="text-gray-500 text-lg">
            Track your income, expenses, and build healthy financial habits!
          </p>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Income</p>
                <p className="text-3xl font-bold mt-1">${totalIncome.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white dark:text-black" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Expenses</p>
                <p className="text-3xl font-bold mt-1">${totalExpenses.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-white dark:text-black" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Savings</p>
                <p className={`text-3xl font-bold mt-1 ${totalSavings >= 0 ? '' : 'text-red-500'}`}>${totalSavings.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white dark:text-black" />
              </div>
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
          className="mb-8 btn btn-primary px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Transaction</span>
        </motion.button>

        {/* Add Transaction Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold mb-6">Add Transaction</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
                <select
                  value={newTransaction.type}
                  onChange={e => setNewTransaction({ ...newTransaction, type: e.target.value })}
                  className="input w-full"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount</label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={e => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  className="input w-full"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={e => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  className="input w-full"
                  placeholder="What was this for?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select
                  value={newTransaction.category}
                  onChange={e => setNewTransaction({ ...newTransaction, category: e.target.value })}
                  className="input w-full"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2 md:col-span-2">
                <button
                  onClick={addTransaction}
                  className="btn btn-primary px-6 py-2 rounded-lg"
                >
                  Add Transaction
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

        {/* Transactions List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-6">Recent Transactions</h3>
          {transactions.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 glass-card rounded-3xl">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No transactions yet</h3>
              <p className="text-gray-500 mb-6">Start tracking your income and expenses to manage your finances better!</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn btn-primary px-6 py-2 rounded-lg"
              >
                Add Your First Transaction
              </button>
            </motion.div>
          ) : (
            transactions
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((transaction, index) => {
                const category = categories.find(c => c.id === transaction.category);
                return (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-card rounded-2xl p-6 hover:border-black/20 dark:hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className={`w-12 h-12 ${category?.color} rounded-xl flex items-center justify-center text-black dark:text-white`}>
                          <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold">
                            {transaction.description}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {category?.name} • {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="text-lg font-bold">
                            {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount || 0).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">
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