const { now } = require("mongoose")
const taskModel = require("../model/taskModel")

const createtask = async function (req,res){
   try {
    const data = req.body
    const {title, description,priority,status,createdAt,isDeleted,deletedAt}  = data

    //  validation
  if(!title)
  return res
  .status(400)
  .send({status:false,message:"title is required"})

  if(!description)
  return res
  .status(400)
  .send({status:false,message:"description is required"})

  if(!priority)
  return res
  .status(400)
  .send({status:false,message:"priority is required"})

    let val  = ["pending","completed"]
  if (!val.includes(status)) return res
  .status(400)
  .send({ status: false, message: `status should be among  ${val} or space is not allowed` })

    createdAt = new Date ()

    if(isDeleted == true){
        deletedAt = new Date()
    }
    let createtask = await taskModel.create(data)

    return res.status(201).send({status:true,message:"task created successfully",data:createtask})
   } catch (err) {
    return res.status(500).send({status:false,message:"server error",error:err.message})
   }
    
    
}

module.exports = {createtask}