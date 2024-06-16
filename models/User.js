const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    fName:{
        type:String,
        required:true,
        trim:true
    },
    lName:{
        type:String,
        required:true,
        trime:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    method:{
        type:String,default:'email'
    },
    reset_token:{
        type:String
    },
    reset_token_expiry:{
        type:Date
    },
    password:{
        type:String,
    }
});

module.exports = mongoose.model("User",userSchema);