const User = require("../models/user");
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require("cloudinary");
var twilio = require("twilio");
require('dotenv').config({ path: './config/config.env' })
//twilio requirements

console.log("process.env.ACCOUNT_SID;",`${process.env.ACCOUNT_SID}`);
console.log("AUTH_TOKEN",process.env.AUTH_TOKEN)
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = new twilio(accountSid,authToken)

//Register a User
exports.registerUser = async (req, res, next) => {
    try {
        console.log("body",req.body);
        const { name, email, password } = req.body;
        console.log("name", name);
        console.log("email", email);
        console.log("password", password);
        console.log("avatar", req.body.avatar);
        const olduser = await User.findOne({ email }).select('+password');
        if (olduser) {
            return next(new ErrorHandler('You already registered..Please log in..', 400))
        }
        if (req.body.avatar == "/images/default_avatar.jpg") {
            console.log("im in degault")
            var user = await User.create({
                name,
                email,
                password,
                avatar: {
                    public_id: "avatars/default_avatar_zvlo1q",
                    url: "https://res.cloudinary.com/daeuzh0zl/image/upload/v1641879724/default_avatar_wzezlf.jpg"
                }
            })
        } else {
            const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale"
            })

            var user = await User.create({
                name,
                email,
                password,
                avatar: {
                    public_id: result.public_id,
                    url: result.secure_url
                }
            })
        }
        const token = user.getJwtToken();
        console.log("token",token)
        res.send({
            success: true,
            token,
            user
          })
    } catch (err) {
        console.log("Error", err);
        res.send({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }
}
//Login User
exports.LoginUser = async (req, res, next) => {
    try{
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }
    const user = await User.findOne({ email }).select('+password');
    console.log("user", user);
    if (user == null) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
  
    const isPasswordMatch = await user.comparePassword(password)
    console.log("isPasswordMatch", isPasswordMatch)
    if (!isPasswordMatch) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    const token = user.getJwtToken();
    console.log("token",token);
        res.send({
            success: true,
            token,
            user
          })
    
}catch(error){
    console.log("Error", err);
    res.send({
        success: false,
        error: err,
        errMessage: err.message,
        stack: err.stack
    })
}
}


exports.sendMessage = async(req,res,next) => {
    try{
      console.log("body",req.body);
      console.log("user",req.user);
      const {recipient,textMessage,recipientLastName,recipientFirstName,OTP} = req.body;
      console.log("OTP",OTP);
      const message = await client.messages.create({
        body:textMessage,
        to:"+"+recipient,
        from:'+19036664791'
      })
      console.log('result',message.body);
      const newMessage = {
        recipient,
        textMessage,
        recipientFirstName,
        recipientLastName,
        OneTimePassword:OTP
      }
      const user = await User.findOne(req.user._id);
      const oldMessages = user.messages;
      console.log("oldMessages",oldMessages);
      oldMessages.push(newMessage);
      const updatedUser = await User.findOneAndUpdate(req.user._id,{
        messages:oldMessages
      },{
        new: true,
        runValidators: true,
        useFindAndModify: false
      })
      res.send({
        success: true,
        message:message.body,
        messages:updatedUser.messages
      })
    }catch(error){
        console.log("Error", error);
        res.send({
            success: false,
            error,
            errMessage: error.message,
            stack: error.stack
        })
    }
}

// exports.getMessages = async(req,res,next) => {
//       try{
//         await User.findOne
//       }catch(error){
//         console.log("Error", error);
//         res.send({
//             success: false,
//             error,
//             errMessage: error.message,
//             stack: error.stack
//         })
//       }
// }