const express = require("express")
const route = require("./router/route")
const mongoose = require("mongoose")
const app = express()
const dotenv = require("dotenv").config()



app.use(express.json())

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MongoDB_Url,{
    useNewUrlParser : true,
}).then(()=> console.log("mongodb is connected successfully"))
.catch((err)=> err)

app.use("/",route)

 const PORT =  process.env._PORT || 3001
app.listen (PORT,function(){
    console.log(`Express is running on ${PORT}` );
});



