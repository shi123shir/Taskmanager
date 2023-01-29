const express  = require("express")
const router = express.Router()
const {createUser, userLogin} = require("../controller/userController")
const {createtask,gettask,updatetask,deletetask} = require("../controller/taskController")


router.post("/register", createUser)
router.post ("/login",userLogin)

router.post("/createtask/:userId",createtask)
router.get("/alltask",gettask)
router.put("/updatetask/:userId/:taskId", updatetask)
router.delete("/deletetask/:userId/:taskId",deletetask)


module.exports= router