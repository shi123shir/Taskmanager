const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId


const  taskSchema = mongoose.Schema({
    // userId :{
    //     type:ObjectId,
    //     ref:"User",
    //     required:true, 
    // },
   title :{
        type:String,
        required : true,
    },
    Description:{
        type:String,
        required: true, 
    },
  priority:{
      type: Number,
      required : true
    },
 status:{
     emum :["pending","completed"]
    },
    createdAt : {type: Date},

    isDeleted :{
        type:Boolean,
        default:false
    },
    deletedAt:{
     type :Date,
     default:null
    }

},{ timestamps: true })


module.exports = mongoose.model("Task",taskSchema)