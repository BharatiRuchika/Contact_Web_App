const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name:{
       type:String,
       required: [true, "please enter user name"],
    },
    email:{
        type: String,
        required: [true, "Please enter your name"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email address"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [5, "password must be greater than 5 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
   
    messages:[
        {
            recipientFirstName:{
                type:String,
                required:true
            },
            recipientLastName:{
                type:String,
                required:true
            },
            recipient:{
                type:String,
                required:true
            },
            textMessage:{
                type:String,
                required:true
            },
            OneTimePassword:{
                type:Number,
                required:true
            },
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hashSync(this.password, 10);
})
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, "GUvi!jdks", {
        expiresIn: "7d"
    });
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    console.log("thispassword",this.password);
    console.log("enteredPassword",enteredPassword);
    console.log(await bcrypt.compareSync(enteredPassword,this.password));
    return await bcrypt.compareSync(enteredPassword, this.password);
}

module.exports = mongoose.model("User", userSchema, "User");