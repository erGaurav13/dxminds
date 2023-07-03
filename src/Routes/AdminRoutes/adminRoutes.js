const express = require("express");
const adminRoute = express.Router();
const {createCourse} =require("../../Controller/AdminController/AdminController.js");
const { CourseModel } = require("../../Models/CourseModel/courseModel.js");
const { authenticateAndAuthorize } = require("../../Middleware/AdminMiddleare.js");


 
// Create a new course by admin tutor


adminRoute.post("/addcourse",authenticateAndAuthorize,async (req,res)=>{
    const { course, price, language,video } = req.body;
    if(!course||!price||!language||!video){
        return res.status(400).send({message:"Required all entity fields"})
    }
    
     try{
           
         const {coursestatus,message} = await createCourse( course, price, language,video );
         if(message=="created"){
            return res.status(201).send({coursestatus,message:"Course created successfully"})
         }else{
            return res.status(400).send({coursestatus,message:"Not created"})
         }
        
     }catch(e){
        console.log(e)
         return e
     }


})

// get all course 
adminRoute.get("/getCourse",authenticateAndAuthorize,async ( req,res)=>{

 try{
        const allCourse = await CourseModel.find({});
        return res.status(200).send({allCourse})
 }catch(e){
       return res.status(400).send({error: e});
 }

})
  

// delete course by id ---- Admin (Tutor)
adminRoute.delete("/getCourse/:id",authenticateAndAuthorize,async ( req,res)=>{

    const {id}=req.params;

    try{
        const result = await CourseModel.deleteOne({ _id:id });
        return res.status(200).send(result)
    }catch(e){
          return res.status(400).send({error: e});
    }
   
   })

module.exports = {
    adminRoute,
  };