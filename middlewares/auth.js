
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticatedUser = async(req,res,next)=>{
    const token = req.header('auth-token');
    console.log("token",token);
    if(!token){
       console.log("im in token undefines");
       return next(new ErrorHandler('You have to login first to access this resource', 401));
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    console.log("id",decoded.id);
    req.user = await User.findById(decoded.id);
    console.log("user",req.user);
    next();
}
