const express=require('express');

const router=express.Router();

const userController=require('../controller/user');

router.post('/user/signup',userController.postSignUpUser);

router.post('/user/login',userController.postLoginUser);



module.exports=router;