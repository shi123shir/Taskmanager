const mongoose = require("mongoose")



const  taskSchema = mongoose.Schema({
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