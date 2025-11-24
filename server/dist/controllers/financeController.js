"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.createTransaction = exports.getTransactions = void 0;
const app_1 = require("../app");
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield app_1.prisma.financeTransaction.findMany({
            where: { userId: req.user.id },
        });
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});
exports.getTransactions = getTransactions;
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, amount, description, category, date } = req.body;
        const transaction = yield app_1.prisma.financeTransaction.create({
            data: {
                userId: req.user.id,
                type,
                amount,
                description,
                category,
                date: date ? new Date(date) : undefined,
            },
        });
        res.status(201).json(transaction);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create transaction' });
    }
});
exports.createTransaction = createTransaction;
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const transaction = yield app_1.prisma.financeTransaction.findUnique({ where: { id } });
        if (!transaction || transaction.userId !== req.user.id) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        yield app_1.prisma.financeTransaction.delete({ where: { id } });
        res.json({ message: 'Transaction deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete transaction' });
    }
});
exports.deleteTransaction = deleteTransaction;
