"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const habitRoutes_1 = __importDefault(require("./routes/habitRoutes"));
const financeRoutes_1 = __importDefault(require("./routes/financeRoutes"));
const studyRoutes_1 = __importDefault(require("./routes/studyRoutes"));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/habits', habitRoutes_1.default);
app.use('/api/finance', financeRoutes_1.default);
app.use('/api/study', studyRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Campus Sync API is running');
});
exports.default = app;
