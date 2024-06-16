const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendMail = async(from , to , subject , html)=>{
    try{

        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port:465,
            secure:true,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });

        const message = transporter.sendMail({
            from : `${from}`,
            to:`${to}`,
            subject:`${subject}`,
            
            html:`${html}`

        })

        return message;

    }catch(error){
        console.log(error);
    }
}