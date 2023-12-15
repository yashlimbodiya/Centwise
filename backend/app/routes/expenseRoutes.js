import express from 'express';
import * as expenseController from '../controllers/expenseController.js';
const router = express.Router();

router.post('/addExpense', expenseController.addExpense);


export default router; 