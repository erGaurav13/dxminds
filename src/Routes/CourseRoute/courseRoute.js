const express = require("express");
const mongoose = require("mongoose");
const { CourseModel } = require("../../Models/CourseModel/courseModel");
const { UserModel } = require("../../Models/UserModel/userModel.js");

const courseRoute = express.Router();

//get All Course
courseRoute.get("/getAllCourse", async (req, res) => {
  try {
    const allCourse = await CourseModel.find({});
    return res.status(200).send({ allCourse });
  } catch (e) {
    return res.status(400).send({ error: e });
  }
});

//get  Course by id
courseRoute.get("/getAllCourse/:id", async (req, res) => {
    const {id}=req.params;
    if(!id){
        return res.status(400).send({message:"Id is required"})
    }
    try {
      const singleCourse = await CourseModel.findOne({_id:id});
      console.log(singleCourse)
      return res.status(200).send({ singleCourse });
    } catch (e) {
      return res.status(400).send({ error: e });
    }
  });

//   Add to cart functionality
courseRoute.post("/cart/add", async (req, res) => {
  const { courseId, userId } = req.body;
  if (!courseId || !userId) {
    return res.status(400).send({ message: "Required courseId, userId " });
  }
  try {
    // Assuming you have a User model to validate the user's existence
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Convert the courseId to ObjectId
    const courseIdObj = new mongoose.Types.ObjectId(courseId);

    // Assuming you have a Cart model to store the cart items
    // Add the course to the user's cart
    user.cart.push({ course: courseIdObj });

    // Save the updated user object
    await user.save();

    return res.status(200).json(user.cart);
  } catch (error) {
    console.error("Error adding course to cart:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//   get all cart item  from user Cart
courseRoute.get("/getAllcart", async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).send({ message: "user not found" });
  }
  try {
    // Assuming you have a User model with the cart field populated
    const user = await UserModel.findById(userId).populate("cart.course");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user.cart);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


// Assuming all payment are sucessfull so calculate total ammount 
// and payment is sucessfull
courseRoute.get("/payment", async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).send({ message: "User not found" });
    }
    try {
      // Assuming you have a User model with the cart field populated
      const user = await UserModel.findById(userId).populate("cart.course");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      let totalAmount = 0;
  
      // Calculate the total amount based on the quantity of each cart item
      user.cart.forEach((item) => {
        const quantity = item.quantity || 1; // Assuming quantity is a property of each cart item
        const price = item.course.price; // Assuming price is a property of the course object
        totalAmount += quantity * price;
      });
  
      // Return the cart items along with the total amount
      return res.status(200).json({   totalAmount });
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = {
  courseRoute,
};
