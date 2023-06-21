const express=require('express');

const router=express.Router();

const forgotPasswordController=require('../controller/forgotPassword')

router.post('/password/forgot-password',forgotPasswordController.postForgotPassword)
router.get('/password/resetpassword/:id',forgotPasswordController.getResetPassword)
router.get('/password/updatepassword/:id',forgotPasswordController.getUpdatepassword)

module.exports=router;


