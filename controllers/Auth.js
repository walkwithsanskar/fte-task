const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const {sendMail} = require("../utlis/mailSender");
const {welcomeTemplate} = require("../templates/welcomeMail");
const {yourNewPassTemplate} = require("../templates/newPasswordTemplate");

exports.signUp = async(req,res)=>{

    try{

        const {
            fName,lName,email,otp,password
        } = req.body;

        // console.log(req.body);

       
        if(!fName || !lName || !email || !otp || !password){
            return res.status(403).json({
                success:false,
                message:"fill in all the details"
            })
        };
        
        //check if user already exists 

        const user = await User.findOne({email:email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"user already exists proceed to login"
            })
        }

        // verify otp

        const response = await OTP.find({email:email}).sort({createdAt:-1}).limit(1);

        if(response.length === 0){
                return res.status(400).json({
                    success:false,
                    message:"can not find your entry"
                })
        }else if(response[0].OTP !== otp){

            return res.status(400).json({
                success:false,
                message:"Otps dont match"
            })


        }
        //now otp verified , i can create users entry in db
        // console.log(1)
        
        
             try{
                
                const hashedPassword = await bcrypt.hash(password,10);
                const createdUser = await User.create({
                   fName,lName,email,password:hashedPassword,
               })

            //    console.log("before mail send in signup")
               
               const mail=await sendMail("Server",email,"Welcome To Server",welcomeTemplate(fName,lName));
               
               return res.status(200).json({
                   success:true,
                   message:"user created successfully",
                   createdUser,
                   mail
               })
             }catch(error){
                console.log(error);
             }

    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"signUp failed"
        })
    }
}

exports.logIn = async(req,res)=>{
    try{
        
        const {email,password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"please provide all info"
            })
        }

        const user = await User.findOne({email:email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"user does not exists"
            })
        }

        if(await bcrypt.compare(password,user.password)){
            
            const options = {
                expiresIn:"48h"
            };
            const payLoad = {
                user_id : user._id,email:user.email
            };

            const token = await jwt.sign(payLoad,process.env.JWT_SECRET,options);

            user.token = token;


            //cookie
            const cookieOption = {
                expires: new Date(Date.now() + 2*24*60*60*1000),
                httpOnly:true
            }
            

            return res.cookie("token",token,options).status(200).json({
                success:true,
                user:user,
                token:token,
                message:"success true"
            })

        }else{
            return res.status(400).json({
                success:false,
                message:"passwords incorrect"
            })
        }


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"cannot login"
        })
    }
}

exports.sendOtp = async(req,res)=>{

    try{
        const {email} = req.body;
      
        if(!email){
            return res.status(400).json({
                success:false,
                message:"please enter email"
            });
        }
        
    const user  = await User.findOne({email:email});

    if(user){
        return res.status(400).json({
            success:false,
            message:"user already exists"
        })
    }
   

    let otp =  otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    })
 
    let temp = await OTP.find({OTP:otp});
    
    while(temp.size>0){
        otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        temp=await OTP.find({OTP:otp});
    }
    

    const otpGenerated = await OTP.create({email:email,OTP:otp});

    return res.status(200).json({
        success:true,
        message:"otp sent",
        otpGenerated
    })

        
    }catch(error){

        console.log("inside send otp");
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"could not send OTP",
        })
    }


}

exports.changePassword = async(req,res)=>{
    
    try{
        const {email,password,newPassword} = req.body;

        if(!email || !password || !newPassword){
            return res.status(400).json({
                success:false,
                message:"cannot reset password"
            })
        }
        // console.log(1);
        const user = await User.findOne({email:email});
        
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user doesnot exists"
            })
        }
        // console.log(user);
        // console.log(password);
        // console.log(user.password);
        if(await bcrypt.compare(password,user.password)){
            // console.log(3);
            const newHashedPass = await bcrypt.hash(newPassword,10);
            
            const user = await User.findOneAndUpdate({email:email},{password:newHashedPass},{new:true});
            // console.log(4);
            // pending to write send mail on update password
            await sendMail("Server",email,"heres your new password",yourNewPassTemplate(password));
            // console.log(5);
            return res.status(201).json({
                success:true,
                message:"updated successfully",
                user
            });
            
        }else{
            return res.status(401).json({
                success:false,
                message:"password incorrect"
            });
        }
       

    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"cannot change password"
        })
    }
}