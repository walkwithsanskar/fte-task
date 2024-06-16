const User = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.auth = async(req,res,next)=>{

    try{

        const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");
            
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token not found unverified user",
            })
        }
        try{

            const secret = process.env.JWT_SECRET;
            const decode = jwt.verify(token,secret);
            req.user = decode;
            // res.status(200).json({
            //     success:true,
            //     message:"token is valid"
            // });

            next();

        }catch(error){
            return res.status(401).json({
                succes:false,
                message:"token invlaid"
            })
        }

    }catch(error){
        console.log("error",error);
        // for dev
        console.log("error in auth middleware");
    }
}