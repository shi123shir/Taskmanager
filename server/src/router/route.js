const express  = require("express")
const router = express.Router()
const {createUser, userLogin} = require("../controller/userController")
const {createtask} = require("../controller/taskController")


router.post("/register", createUser)
router.post ("/login",userLogin)

router.post("/createtask",createtask)










module.exports= router