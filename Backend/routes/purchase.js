const express=require('express');

const router=express.Router();

const authMiddleware=require('../middleware/auth')

const purchaseController=require('../controller/purchase')

router.get('/purchase/premiummembership',authMiddleware.authenticate,purchaseController.getPremiumMembership)

router.post('/purchase/updatetransactionstatus',authMiddleware.authenticate,purchaseController.postUpdateTransactionStatus)

router.post('/purchase/failedtransaction',authMiddleware.authenticate,purchaseController.postFailedTransaction)






module.exports=router;