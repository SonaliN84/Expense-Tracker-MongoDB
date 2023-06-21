const express=require('express');

const router=express.Router();

const expenseController=require('../controller/expense')

const authMiddleware=require('../middleware/auth')

router.post('/expense/add-expense',authMiddleware.authenticate,expenseController.postAddExpense)

router.get('/expense/download',authMiddleware.authenticate,expenseController.getDownloadExpense)

router.get('/expense/downloadHistory',authMiddleware.authenticate,expenseController.getDownloadHistory)

router.get('/expense',authMiddleware.authenticate,expenseController.getExpenses)

router.delete('/expense/delete-expense/:expenseId',authMiddleware.authenticate,expenseController.deleteExpense)

router.put('/expense/edit-expense/:expenseId',authMiddleware.authenticate,expenseController.editExpense)

module.exports=router