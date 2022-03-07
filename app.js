const express=require('express');
const app = express();
const mongoose=require('./database/mongoose')
const TaskList=require('./database/models/tasklist')
const Task=require('./database/models/task');
const res = require('express/lib/response');



// CORs-Cross Origin Request Security
// Front end :http://localhost:4200
// Backend :http://localhost:3000

// Front end is running on 3000 port and front end running on 42000 port so it will
//allow only 3000 port if we want to allow the front end also we have to tell the browser to 
//the 42000 port as well 

//3rd party library app.use(cors())

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Pass to next layer of middleware
    next();
});

//Example of middle ware
app.use(express.json())// or 3rd party body parser

//Routes or REST API Endpoints or Restful webservices Endpoints
/*
TaskList-Create,Update,ReadTaskListById,ReadAllTaskList
Task-Create,Update,ReadTaskById,ReadAllTask
*/
//Routes or API endpoints for TaskList model
//Get All Task Lists
//http:://localhost:3000/tasklists  => [{TaskList},{TaskList}]

app.get('/tasklists',(req,res)=>{
    TaskList.find({})
    .then((lists)=> {
    res.status(200);
    res.send(lists);
    
    }
    )
    .catch((error)=>{
        console.log(error);
        res.status(500);
    });
});
//Endpoints to get one tasklist by tasklistid:http://localhost:3000/tasklists/62237106e5df40e5e4544ac3
app.get(
    '/tasklists/:tasklistId',(req,res)=>{
        let tasklistId=req.params.tasklistId;
        TaskList.find({_id:tasklistId})
        .then((taskList)=>{
            res.status(200);
            res.send(taskList)
        })
        .catch((error)=>{
            console.log(error);
        })
    }


);

//Put is for full update of an object 
app.put(
    '/tasklists/:tasklistId',(req,res)=>{
        TaskList.findOneAndUpdate({_id:req.params.tasklistId},{$set:req.body})
        .then((taskList)=>{
            res.status(200);
            res.send(taskList)
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    
);
//Patch is for partial update of field of an object 
app.patch(
    '/tasklists/:tasklistId',(req,res)=>{
        TaskList.findOneAndUpdate({_id:req.params.tasklistId},{$set:req.body})
        .then((taskList)=>{
            res.status(200);
            res.send(taskList)
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    
);
//Delete a tasklist by id
app.delete('/tasklists/:tasklistId',(req,res)=>{
        //Delete all tasks within a tasklist if that tasklist is deleted
        const deleteAllContainingTask=(taskList)=>{
          Task.deleteMany({_taskListId: req.params.tasklistId })
              .then(()=>{
                  return taskList
              })  
              .catch((error)=>{
                  console.log(error);
              })
        }   
        const responeTaskList=TaskList.findByIdAndDelete(req.params.tasklistId)
        .then((taskList)=>{
            deleteAllContainingTask(taskList)
        })
        .catch((error)=>{
            console.log(error);
        })
        res.status(200);
        res.send(responeTaskList)
    }

    
);
/*
CRUD operation fot Task , a task should always belong to a TaskList
*/
//Get all tasks for 1 Tasklist ,http://localhost:3000/taskslists/:tasklistId/tasks
app.get('/tasklists/:tasklistId/tasks',(req,res)=>{
     Task.find({
        _taskListId:req.params.tasklistId
     })
     .then((taskList)=>{
        res.status(200);
        res.send(taskList)
    })
    .catch((error)=>{
        console.log(error);
    })

});
//Create a task inside a particular tasklist
app.post('/tasklists/:tasklistId/tasks',(req,res)=>{
    //console.log("Hello i am inside postman");
    console.log(req.body);
    let taskobject={'title':req.body.title,'_taskListId':req.params.tasklistId}
    Task(taskobject).save()
    .then((task)=>{
        res.status(201);
        res.send(task);
        
    })
    .catch((error)=>{
        console.log(error);
        res.status(500);
    });
});
//http://localhost:3000/taskslists/:tasklistId/tasks/:taskId
//Get 1 task inside 1 Tasklist
app.get('/tasklists/:tasklistId/tasks/:taskId',(req,res)=>{
    Task.findOne({
       _taskListId:req.params.tasklistId,
       _id:req.params.taskId
       
    })
    .then((task)=>{
       res.status(200);
       res.send(task)
   })
   .catch((error)=>{
       console.log(error);
   })

});

//Routes or endpoints for creating a tasklist
app.post('/tasklists',(req,res)=>{
    //console.log("Hello i am inside postman");
    console.log(req.body);
    let tasklistobject={'title':req.body.title};
    TaskList(tasklistobject).save()
    .then((taskList)=>{
        res.status(201);
        res.send(taskList);
        
    })
    .catch((error)=>{
        console.log(error);
        res.status(500);
    });
});
//Update 1 task belonging to a Tasklist
app.patch(
    '/tasklists/:tasklistId/tasks/:taskId',(req,res)=>{
        Task.findOneAndUpdate({_taskListId:req.params.tasklistId,_id:req.params.taskId},{$set:req.body})
        .then((task)=>{
            res.status(200);
            res.send(task)
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    
);
//Delete 1 task belonging to a Tasklist
app.delete(
    '/tasklists/:tasklistId/tasks/:taskId',(req,res)=>{
        Task.findOneAndDelete({_taskListId:req.params.tasklistId,_id:req.params.taskId})
        .then((task)=>{
            res.status(200);
            res.send(task)
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    
);
//server
// app.listen(3000,function(){
// console.log("Server Started at 3000");

// });

//same as above arrow function works same AS ABOVE
app.listen(3000,()=>{
    console.log("Server Started at 3000 great");
    
    });