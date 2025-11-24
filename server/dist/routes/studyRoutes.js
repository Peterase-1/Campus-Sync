"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studyController_1 = require("../controllers/studyController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.use(auth_1.authenticate);
// Notes
router.get('/notes', studyController_1.getNotes);
router.post('/notes', studyController_1.createNote);
router.delete('/notes/:id', studyController_1.deleteNote);
// Tasks
router.get('/tasks', studyController_1.getTasks);
router.post('/tasks', studyController_1.createTask);
router.patch('/tasks/:id', studyController_1.updateTask);
router.delete('/tasks/:id', studyController_1.deleteTask);
exports.default = router;
