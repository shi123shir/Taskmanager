const mongoose = require("mongoose")


const  userSchema = mongoose.Schema({
    name :{
        type:String,
        required : true,
    },
    email:{
        type:String,
        required: true, 
        unique : true,
    },
    password:{
       type: String,
       required: true,
       min : 8,
       max : 15
    },
    confirmPassword :{
     type : String ,
     required :  true,
     min : 8,
     max : 15
    },
},{ timestamps: true })


module.exports = mongoose.model("User",userSchema)