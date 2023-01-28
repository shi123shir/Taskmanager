const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken")

const isValidType = (value) => {
  if (typeof value !== "string" || value.trim().length === 0) {
    return false;
  }
  return true;
};
var nameRegex = /^[a-z\s]+$/i;
var emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
var passwordRegex = /^(?!.\s)[A-Za-z\d@$#!%?&]{8,15}$/;
const createUser = async function (req, res) {
  try {
    const data = req.body;
    const { name, email, password, confirmPassword } = data;
    if (Object.keys(req.body).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Please Provide Details" });

    if (!name)
      return res
        .status(400)
        .send({ status: false, message: "Please Provide name" });

    if (!isValidType(name))
      return res
        .status(400)
        .send({ status: false, message: "name should be a string value " });

    if (!nameRegex.test(name))
      return res
        .status(400)
        .send({ status: false, message: "name should in proper format" });

    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "email is required" });

    if (!emailRegex.test(email))
      return res
        .status(400)
        .send({ status: false, message: "email should be in proper format" });

    const useremail = await userModel.findOne({ email: email });
    if (useremail) 
    return res
    .status(400)
    .send({ status: false, message: "email is alredy exist" });

    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "password is required" });

    if (!passwordRegex.test(password))
      return res
        .status(400)
        .send({
          status: false,
          message: "password should be in proper format",
        });

    if (!confirmPassword)
      return res
        .status(400)
        .send({ status: false, message: "confirmpassword is required" });

    if (password !== confirmPassword)
      return res
        .status(400)
        .send({ status: false, message: "password doesn't match" });

    const createuser = await userModel.create(data);

    return res
      .status(201)
      .send({
        status: true,
        message: "user created sucessfully",
        data: createUser,
      });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: "server error", error: err.message });
  }
};


const userLogin = async function (req, res) {
    try {
      let data = req.body;
      let { email, password } = data;
  
      if (Object.keys(data).length === 0)
        return res
          .status(400)
          .send({ status: false, message: "Data is required to login" });
  
      if (!email)
        return res
          .status(400)
          .send({ status: false, message: "email is required" });
  
      if (!emailRegex.test(email))
        return res
          .status(400)
          .send({ status: false, message: "email must be in valid format" });
  
      let user = await userModel.findOne({ email: email });
      if (!user) {
        return res
          .status(401)
          .send({ status: false, message: "Invalid Email Id" });
      }
      if (!password)
        return res
          .status(400)
          .send({ status: false, message: "user password is required" });
  
      if (!passwordRegex.test(password))
        return res
          .status(400)
          .send({ status: false, message: "Password should be in valid format" });
  
      let token = jwt.sign(
        {
          userId: user._id,
          iat: new Date().getTime(),
          exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60,
        },
        "taskmanger"
      );
  
      return res.status(201).send({
        status: true,
        message: "user login successfully",
        data: { userId: user._id, token: token },
      });
    } catch (err) {
      res
        .status(500)
        .send({ status: false, message: "server error", error: err });
    }
  };

module.exports = { createUser,userLogin };
