const {UserModel}=require('../../Models/UserModel/userModel.js')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const checkRegisterEmail=async (email)=>{
     try{
             const user= await UserModel.find({email});
            //  console.log(user)
              if(user.length<=0){
                return true;
              } 
              return false;
     }catch(e){
        console.log(e)
        return false
     }       
}


const createUser=async(name,email,hash)=>{
 try{
        const newUser= await UserModel.create({name:name,email:email,password:hash,role:"admin"});
        return newUser
 }catch(e){
    console.log(e)
     return false;
 }


}


const userLogin=async(email,password)=>{
// console.log(password,email)
    try{
        // find user
        const user= await UserModel.findOne({email});
      
        console.log(user,"SSS")
        if(!user ){
            return {message:"email id not registered",token:null};
        }    
   
        //   validate password 
        // console.log(password,user.password)
    let isValid= await bcrypt.compare(password, user.password);
    // console.log(isValid)
         if(!isValid){
            return {message:"password not valid",token:null};
         }
        
         const token = jwt.sign({ email: user.email ,role:user.role,userID:user._id  }, process.env.SECRETE_KEY, {
            expiresIn: process.env.TOKEN_EXP,
          });

          return {message:"Sucess Login", token: token}
    }catch(e){
        console.log(e)
        return false;
    }
}


module.exports={
    checkRegisterEmail,createUser,userLogin
}