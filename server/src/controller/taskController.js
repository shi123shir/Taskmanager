const { now, default: mongoose } = require("mongoose")
const { updateOne } = require("../model/taskModel")
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

const  gettask =async function (req,res){
try {
  
  let gettasks = await taskModel.find()

  res.status(200).send({status:true,message:"tasks fetch sucessfully",data:gettasks})
} catch (err) {
  return res.status(500).send({status:false,message:"server error",error:err.message})
}
}


const updatetask = async function (req,res){
  const data = req.body
  const taskId = req.params.taksID

  if(!mongoose.isValidObjectId(taskId)) 
  return res
  .status(400)
  .send({status:false,message:"id should be valid"})

  if(Object.keys(data).length == 0)
  return res
  .status(400)
  .send({status:false,message:"some data is required for updation"})

  let uptask = await taskModel.findOneAndUpdate({_id : taksId},
    {$set:data} , {new:true}
    )
res.status(200).send({status:false,message:"update sucesssfull",data:uptask})
}


const deletetask = async function(req,res){
  let taskId = req.params.taskId 
  if(!mongoose.isValidObjectId(taskId)) 
  return res
  .status(400)
  .send({status:false,message:"id should be valid"})

     await taskModel.updateOne({_id:taskId},
       {$set :{isDeleted:true ,deletedAt: new Date()}},
       {new:true}
      )

      return res.status(200).send({satus:true,message: "task deleted sucessfully"})
}

module.exports = {createtask,gettask,updatetask,deletetask}