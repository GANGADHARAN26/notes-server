const express = require('express');

const {
    CreateUser,
    UserLogin,
    ForgotPassword,
    updatePassword
}=require("../controller/userCtrl");

const router=express.Router();
router.post("/register",CreateUser)
router.post("/login",UserLogin)
router.post("/forgot-password",ForgotPassword)
router.post("/update-password",updatePassword)
module.exports=router;