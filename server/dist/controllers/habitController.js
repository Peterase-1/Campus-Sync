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
exports.deleteHabit = exports.updateHabit = exports.createHabit = exports.getHabits = void 0;
const app_1 = require("../app");
const getHabits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const habits = yield app_1.prisma.habit.findMany({
            where: { userId: req.user.id },
        });
        res.json(habits);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch habits' });
    }
});
exports.getHabits = getHabits;
const createHabit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, frequency } = req.body;
        const habit = yield app_1.prisma.habit.create({
            data: {
                userId: req.user.id,
                name,
                description,
                frequency,
            },
        });
        res.status(201).json(habit);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create habit' });
    }
});
exports.createHabit = createHabit;
const updateHabit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        const habit = yield app_1.prisma.habit.findUnique({ where: { id } });
        if (!habit || habit.userId !== req.user.id) {
            return res.status(404).json({ error: 'Habit not found' });
        }
        const updatedHabit = yield app_1.prisma.habit.update({
            where: { id },
            data: updates,
        });
        res.json(updatedHabit);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update habit' });
    }
});
exports.updateHabit = updateHabit;
const deleteHabit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const habit = yield app_1.prisma.habit.findUnique({ where: { id } });
        if (!habit || habit.userId !== req.user.id) {
            return res.status(404).json({ error: 'Habit not found' });
        }
        yield app_1.prisma.habit.delete({ where: { id } });
        res.json({ message: 'Habit deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete habit' });
    }
});
exports.deleteHabit = deleteHabit;
