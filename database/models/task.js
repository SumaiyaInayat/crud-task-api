const mongoose=require('mongoose');
const TaskScheme=new mongoose.Schema({
     title:{
          type:String,
          trim:true,
          minlength:3
     },
     _taskListId:{
         type:mongoose.Types.ObjectId,
         required:true
     },
     completed:{
         type:Boolean,
         default:false,
         
     }

});
const Task=mongoose.model('Task',TaskScheme);
module.exports=Task;