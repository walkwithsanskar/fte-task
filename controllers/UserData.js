const User = require("../models/User");


exports.getUserData = async(req,res)=>{

    try{
        const {user_id} = req.user;
        const userData = await User.findById(user_id);
        userData.password="";
        return res.status(200).json({
            success:true,
            message:"fetched user data",
            data:userData
        })
    }catch(error){

        return res.status(500).json({
            success:false,
            message:"cant find your data "
        })
    }
}