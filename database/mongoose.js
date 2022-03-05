const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://127.0.0.1:27017/taskmanagerdb')
  .then(() => {
    console.log("Db connected sucessfully");
  })
  .catch((error) => {
    console.log(error);
  });
module.exports=mongoose;

// app.get(
//   '/tasklists/:tasklistId',(req,res)=>{
//       let tasklistId=req.params.tasklistId;
//       TaskList.find({_id:tasklistId})
//       .then((taskList)=> {
//       res.status(200);
//       res.send(taskList);
      
//       }
//       )
//       .catch((error)=>{
//           console.log(error);
//           res.status(500);
// });