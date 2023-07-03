const express = require("express");
const cors = require("cors");
const connectToDB = require("./Config/connect.js");
const {authRoute}=require("./src/Routes/AuthRoutes/AuthRoutes.js")
 const {courseRoute}=require("./src/Routes/CourseRoute/courseRoute.js")
 const {adminRoute}=require("./src/Routes/AdminRoutes/adminRoutes.js")
const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

app.use('/auth',authRoute)
app.use("/course",courseRoute)
app.use("/admin",adminRoute)
app.get("/", (req, res) => {});


// Server Started
app.listen(PORT,async () => {
    
    try{
          await connectToDB
          console.log(`Server started at ${PORT}`);
    }catch(e){
        console.log(e)
    } 
});
