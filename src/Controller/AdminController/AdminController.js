const {CourseModel}= require("../../Models/CourseModel/courseModel.js");


const createCourse = async(course, price, language,video)=>{
    try{
        // course created successfully
    const ans= await  CourseModel.create({course, price, language,video})
    return {message:"created",coursestatus: ans};
    }catch(e){
        return e
    }
}



module.exports={
    createCourse
}