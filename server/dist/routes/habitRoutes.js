"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const habitController_1 = require("../controllers/habitController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.use(auth_1.authenticate);
router.get('/', habitController_1.getHabits);
router.post('/', habitController_1.createHabit);
router.patch('/:id', habitController_1.updateHabit);
router.delete('/:id', habitController_1.deleteHabit);
exports.default = router;
