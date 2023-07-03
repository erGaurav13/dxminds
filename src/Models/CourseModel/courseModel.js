const mongoose=require('mongoose');

const courseSchema=mongoose.Schema({

   course:{type:String,required:true},
   language:{type:String,required:true},
   video:{type:String,required:true},
   price:{type:Number,required:true},
})

const CourseModel=mongoose.model('course',courseSchema);

module.exports={
    CourseModel
}