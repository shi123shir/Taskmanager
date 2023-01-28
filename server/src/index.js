const express = require("express")
const route = require("./router/route")
const mongoose = require("mongoose")
const app = express()

app.use(express.json())

mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://shishir1912-DB:F85ml8mUXi1MrEKV@cluster0.2ta5zuw.mongodb.net/taskmanager",{
    useNewUrlParser : true,
}).then(()=> console.log("mongodb is connected successfully"))
.catch((err)=> err)

app.use("/",route)

 const PORT =  process.env.PORT || 3001
app.listen (PORT,function(){
    console.log(`Express is running on ${PORT}` );
});



