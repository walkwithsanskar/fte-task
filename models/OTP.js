const mongoose = require("mongoose");
const {sendMail} = require("../utlis/mailSender");
const {otpTemplate} = require("../templates/otpTemplate");


const otpSchema=new mongoose.Schema({
    OTP:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:60*20 // otp expires in 5 minutes
    }
    
});


otpSchema.pre('save',async function(next){

    if(this.isNew){
        // console.log("in schema otp")
        await sendMail("Hush Mate",this.email,"Welcome To  Server Here's your verification OTP",otpTemplate(this.OTP));
    }
    next();
    
})

module.exports = mongoose.model("OTP",otpSchema);