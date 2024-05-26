const { transport,mailOptions } = require("../mail-service/mail");
const Task=require("../models/taskModel") 
const User=require("../models/userModel");
const {v4} =require('uuid');
const CreateTask= async (req, res) => {
    const emailId = req.body.email;
    const payload=req.body;
    console.log(payload);
   try{
    const findUser = await User.findOne({ email: emailId });
    if (findUser) {
      //createing a new user
      const tasks=payload.task
      const updatedTasks=[]
      for(let i=0; i<tasks.length;i++) {
        let task=tasks[i];
        let changedTask={...task,id:v4()}
        updatedTasks.push(changedTask)
      }
      payload.task = updatedTasks
      const newTask=await Task.create(payload)
      res.json(newTask);
    } else {
      res.status(401).send({notify:"Some error occurred,try again later"});
    }
    if(payload.isremainder===true && payload.timeout>0){
      const time=payload.timeout*60*60*1000
      setTimeout(() => {
         transport.sendMail({...mailOptions,
          subject:"Remainder Notification from Note App ",
          to:payload.email,
          text:`Please Complete your ${payload.name} task`})
          console.log(payload.timeout);
      }, time);
    }
   }catch(err){
    res.status(401).send({notify:"Some error occurred,try again later"});
   }
  };

  const GetAllTasks=async (req,res) => {
    const emailId = req.body.email;
    const tasks=await Task.find({email:emailId,trash:false})
    if(tasks){ 
        res.json(tasks)
    }else{ 
        res.status(401).send({notify:"Problem in getting all tasks ,try again later"});

    }
  }
  
  const GetAllStarredTasks=async (req,res) => {
    const emailId = req.body.email;
    const tasks=await Task.find({email:emailId,starred:true})
    if(tasks){ 
        res.json(tasks)
    }else{
        res.status(401).send({notify:"Problem in getting all starred tasks ,try again later"});

    }
  }
  const GetAllRemainderTasks=async (req,res) => {
    const emailId = req.body.email;
    const tasks=await Task.find({email:emailId,isremainder:true})
    if(tasks){ 
        res.json(tasks)
    }else{
        res.status(401).send({notify:"Problem in getting all remainder tasks ,try again later"});

    }
  }
  const GetAllTrashedTasks=async (req,res) => {
    const emailId = req.body.email;
    const tasks=await Task.find({email:emailId,trash:true})
    if(tasks){ 
        res.json(tasks)
    }else{
        res.status(401).send({notify:"Problem in getting all starred tasks ,try again later"});

    }
  }
  const StarTask=async (req,res) => {
    const payload=req.body;
      const findTask=await Task.findById(payload._id);
      if(findTask){
              findTask.starred=!findTask.starred;
              const updated=await Task.findByIdAndUpdate(findTask._id,findTask)
        res.json(updated);
         
      }else
      {
        res.status(401).send({notify:"Problem in task starred,try again later"});
      }
  }
  const BinTask=async (req,res) => {
    const payload=req.body;
      const findTask=await Task.findById(payload._id);
      if(findTask){
              findTask.trash=!findTask.trash;
              const updated=await Task.findByIdAndUpdate(findTask._id,findTask) 
              res.json(updated).send({notify:"deleted successfully"});
      }else
      {
        res.status(401).send({notify:"Problem in adding task to trash,try again later"});
      }
  }
  const UpdateTask=async (req, res)=>{
    const payload=req.body;
    const Findedtask=await Task.findById(payload._id);
    console.log(payload)

    Findedtask.task=payload.task; 
   if(Findedtask){
    const updated=await Task.updateOne(
        {_id:Findedtask._id}, 
        {$set:{task:payload.task}}
    );
    if (updated){
        res.json(updated).send({notify:"deleted successfully"});;
    }else{
        res.status(401).send({notify:"Problem in updating task to trash,try again later"});

    }
   }else{
    res.status(401).send({notify:"Problem in updating task to trash,try again later"});

   }
  }

  module.exports = {
    CreateTask,
    StarTask,
    BinTask,
    GetAllTasks,
    UpdateTask,
    GetAllRemainderTasks,
    GetAllStarredTasks,
    GetAllTasks,
    GetAllTrashedTasks
  };   