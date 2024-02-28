const User=require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');
const { transport } = require("../mail-service/mail");
const { mailOptions} = require("../mail-service/mail");

//user creation 
const CreateUser = async (req, res) => {
    const emailId = req.body.email;
    const payload=req.body;
    const findUser = await User.findOne({ email: emailId });
    if (!findUser) {
      //createing a new user
      const hashedPassword=await bcrypt.hash(payload.password,10)
      req.body.password = hashedPassword;
      const newUser = await User.create(req.body);
      res.json(newUser);
    } else {
      res.status(401).send({notify:"User already exists"});
    }
  };

  //user login
  const UserLogin = async (req, res) => {
    const emailId = req.body.email;
    const payload=req.body;
    const findUser = await User.findOne({ email: emailId });
    const valid=await bcrypt.compare(payload.password,findUser.password)
    if (findUser) {
      //createing a new user
      if(valid){
        res.status(200).send({notify:"Login success",informcode:2020,email:emailId});
      }else{
        res.status(401).send({notify:"Wrong password, please try again"});
      }
    } else {
      res.status(401).send({notify:"User already exist, Try again later"});
    }
  };
  const ForgotPassword = async (req, res) => {
    const emailId = req.body.email;
    const payload=req.body;
    const findUser = await User.findOne({ email: emailId });
    if (findUser) {
      //createing a new user
      const token=jwt.sign({email:emailId},process.env.JWT_SECRET,{expiresIn:'1d'});
      const link=`${process.env.FRONTEND_URL}/verifyForgotPassword?token=${token}`;
      await transport.sendMail({...mailOptions,
          subject:"Forgot Password verification link",
          to:payload.email,
          text:`Request from the Notes Application , Please verify your e-mail
           address to change the password using these link ${link} `})
      res.send({notify:" email has been send successfully to emial for password reset verification link"})
    } else {
      res.status(401).send({notify:"Error in password reset"});
    }
  };
  const updatePassword = async (req, res) => {
    const payload=req.body;
        const decodedtoken=jwt.verify(payload.token,process.env.JWT_SECRET)
        const hashedPassword=await bcrypt.hash(payload.password,10)
        const verified=await User.findOne({email:decodedtoken.email})
        if(verified){
            await User.updateOne({email:decodedtoken.email},{'$set':{password:hashedPassword}});
            res.send({notify:"updated password"})
        }
        else{
            res.status(401).send({notify:"Token is not validated please try again"})
        }
       
  }; 
  module.exports = {
    CreateUser,
    UserLogin,
    ForgotPassword,
    updatePassword
  }; 