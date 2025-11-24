"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const financeController_1 = require("../controllers/financeController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.use(auth_1.authenticate);
router.get('/transactions', financeController_1.getTransactions);
router.post('/transactions', financeController_1.createTransaction);
router.delete('/transactions/:id', financeController_1.deleteTransaction);
exports.default = router;
