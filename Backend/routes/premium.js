const express=require('express');

const router=express.Router();

const premiumController=require('../controller/premium')

const authMiddleware=require('../middleware/auth')

router.get('/premium/showleaderboard',authMiddleware.authenticate,premiumController.getLeaderboard)

router.get('/premium/expense-analysis',authMiddleware.authenticate,premiumController.getExpenseAnalysis)



module.exports=router;