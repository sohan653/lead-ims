const mongoose = require('mongoose');
const validator = require("validator");
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:[true,"please provide a email "],
        unique:true,
        lowercase:true,
        trim:true,
        validate:[validator.isEmail, "please provide a valid email name"]
    },
    password:{
        type:String,
        required:[true, "password is required"],
        validate:{
            validator: value => validator.isStrongPassword(value,{
                minLength:6,
                minLowercase:3,
                minUppercase:1,
                minNumbers:1,
                minSymbols:1
            }),
            message: "password {VALUE} is not strong"
        }

    },
    confirmPassword:{
        type:String,
        required:[true, "confirm password is required"],
       validate:{
        validator: function (value){
            return value === this.password
        },
        message: "password not matched"
       }
    },
    roll:{
        type:String,
        enum:["buyer","store-manager","admin"],
        default:"buyer"
    },
    firstName:{
        type:String,
        trim:true,
        required:[true, "please provide a firstname"],
        minLength:[3,"name must be at least 3 characters"],
        maxLength:[50, "name is too large"]
    },
    lastName:{
        type:String,
        trim:true,
        required:[true, "please provide a lastname"],
        minLength:[3,"name must be at least 3 characters"],
        maxLength:[50, "name is too large"]
    },
    contactNumber:{
        type:String,
        validate:[validator.isMobilePhone, "please provide a valid phone number"]
    },
    shippingAddress:String,
    imageURL:{
        type:String,
        trim:true,
        validate:[validator.isURL, "please provide a valid imageURL"]
    },
    status:{
        type:String,
        default:"inactive",
        enum:["active","inactive","blocked"]
    },
    confirmationToken: String,
    confirmationTokenExpires: Date,

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},{timestamps:true, versionKey:false})

module.exports = mongoose.model('User', userSchema);




