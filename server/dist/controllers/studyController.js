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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = exports.deleteNote = exports.createNote = exports.getNotes = void 0;
const app_1 = require("../app");
// Notes
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield app_1.prisma.studyNote.findMany({
            where: { userId: req.user.id },
        });
        res.json(notes);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
});
exports.getNotes = getNotes;
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, subject } = req.body;
        const note = yield app_1.prisma.studyNote.create({
            data: {
                userId: req.user.id,
                title,
                content,
                subject,
            },
        });
        res.status(201).json(note);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create note' });
    }
});
exports.createNote = createNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const note = yield app_1.prisma.studyNote.findUnique({ where: { id } });
        if (!note || note.userId !== req.user.id) {
            return res.status(404).json({ error: 'Note not found' });
        }
        yield app_1.prisma.studyNote.delete({ where: { id } });
        res.json({ message: 'Note deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
});
exports.deleteNote = deleteNote;
// Tasks
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield app_1.prisma.studyTask.findMany({
            where: { userId: req.user.id },
        });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, priority, dueDate } = req.body;
        const task = yield app_1.prisma.studyTask.create({
            data: {
                userId: req.user.id,
                title,
                description,
                priority,
                dueDate: dueDate ? new Date(dueDate) : undefined,
            },
        });
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        const task = yield app_1.prisma.studyTask.findUnique({ where: { id } });
        if (!task || task.userId !== req.user.id) {
            return res.status(404).json({ error: 'Task not found' });
        }
        const updatedTask = yield app_1.prisma.studyTask.update({
            where: { id },
            data: updates,
        });
        res.json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield app_1.prisma.studyTask.findUnique({ where: { id } });
        if (!task || task.userId !== req.user.id) {
            return res.status(404).json({ error: 'Task not found' });
        }
        yield app_1.prisma.studyTask.delete({ where: { id } });
        res.json({ message: 'Task deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});
exports.deleteTask = deleteTask;
