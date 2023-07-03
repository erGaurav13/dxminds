const mongoose =require('mongoose');
const dotenv=require('dotenv');
dotenv.config()

 const connect =mongoose.connect(process.env.DB_URL)

 module.exports={
    connect
 }