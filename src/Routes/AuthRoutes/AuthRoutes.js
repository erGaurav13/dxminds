const express = require("express");

const authRoute = express.Router();
const bcrypt = require("bcrypt");
const {
  checkRegisterEmail,
  createUser,
  userLogin,
} = require("../../Controller/AuthController/AuthController.js");
const salt = 10;


// register new user Route
authRoute.post("/signup", async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).send({ message: "missing email,name or password" });
  }
  try {
    //  check useremail is registered or not
    const check = await checkRegisterEmail(email);
    // console.log(check);
    if (!check) {
      return res.status(400).send({ message: "User Already registered!" });
    }
    //   hash password
    const hash = bcrypt.hashSync(password, salt);

    //  create a new user
    const newUser = await createUser(name, email, hash);
    if (!newUser) {
      return res.status(400).send({ message: "user Creation failed" });
    }
    return res
      .status(201)
      .send({ message: "user created successfully", newUser });
  } catch (e) {
    // console.log(e);
    return res.status(400).send({ message: "Internal Server Error" });
  }
});

// login Route
authRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "email,password is required" });
  }

  try {
    const status = await userLogin(email, password);

    const { message, token } = status;

    if (!token) {
      return res.status(400).send({ message });
    }

    return res.status(200).send({ message, token });
  } catch (e) {
    console.log(e);
  }
});

module.exports = {
  authRoute,
};
