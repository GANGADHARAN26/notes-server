const nodemailer = require('nodemailer');
const dotenv=require('dotenv');
dotenv .config();
 const transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.NODEMAILER_USER,
        pass:process.env.NODEMAILER_PASS
    }
})
 const mailOptions={
    from:'anubmanickam1972@gmail.com',
    to:'gangadharana01@gmail.com',
    subject:'Sending email using node js success',
    text:'that was esay'
}; 
module.exports ={mailOptions,transport}