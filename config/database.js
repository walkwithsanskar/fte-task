const mongoose= require("mongoose");
require("dotenv").config();
exports.dbConnect=()=>{
    try{
        
        mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then(()=>{
            console.log("db coneection successfull")
        }).catch((error)=>{
            console.log(error);
        })

    }catch(error){
        console.log(error);
        console.log("could not connect to db")
    }
}