const mongoose=require('mongoose');
const TaskListScheme=new mongoose.Schema({
     title:{
          type:String,
          trim:true,
          minlength:3
     },
     name:{
        type:String,
        trim:true,
        minlength:3
   }
});
const TaskList=mongoose.model('TaskList',TaskListScheme);
module.exports=TaskList;

