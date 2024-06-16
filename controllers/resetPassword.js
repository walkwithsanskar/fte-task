const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const {sendMail} = require("../utlis/mailSender");
const {yourNewPassTemplate} = require("../templates/newPasswordTemplate");
const {passwordResetTemplate} = require("../templates/passwordReset");

exports.createAndSendToken=async(req,res)=>{
    try{

        const {email} = req.body;
        // console.log(email);
        if(!email){
            return res.status(400).json({
                success:false,
                message:"please fill all details"
            })
        }

        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user doesnot exists"
            })
        }

        const token = crypto.randomBytes(20).toString("hex");
       
        const updateUser = await User.findOneAndUpdate({email:email},{
            reset_token:token,reset_token_expiry:new Date(Date.now()+5*60*1000)
            
        },{new:true});

        //send mail
        const url = `http://localhost:3000/resetpassword/${token}`;
        await sendMail("Hush Mate",email,"Heres your password reset url",passwordResetTemplate(url));

        return res.status(200).json({
            success:true,
            message:"token mail sent successfully",
            token,
            updateUser
        })


    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"cant send reset token"
        })
    }
}

exports.resetPassword = async(req,res)=>{
    try{
        const {password,confirmPassword} = req.body;
        const {token} = req.params;
        console.log(token);
        if(!password || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"fill in all the details",

            })
        }
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password dont match"
            })
        }

        const user = await User.findOne({reset_token:token});
        console.log(user);
        if(user && user.reset_token_expiry>Date.now()){
            
            const hash = await bcrypt.hash(password,10);
            const user2 = await User.findOneAndUpdate({_id:user._id},{
                password:hash
            },{new:true});

            //send mail to updated password
            sendMail("Server",user.email,"Heres your new password",yourNewPassTemplate(password));

            return res.status(200).json({
                success:true,
                message:"sent updated password on mail",
                
            })


        }else{
            return res.status(400).json({
                success:false,
                message:"token expired"
            })
        }

    }catch(error){

        console.log(error);
        return res.status(400).json({
            
            success:false,
            message:"cannot reset password"
        })
    }
}