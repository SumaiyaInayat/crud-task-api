const express=require('express');
const app = express();
const mongoose=require('./database/mongoose')
//server
// app.listen(3000,function(){
// console.log("Server Started at 3000");

// });

//same as above arrow function works same AS ABOVE
app.listen(3000,()=>{
    console.log("Server Started at 3000 great");
    
    });