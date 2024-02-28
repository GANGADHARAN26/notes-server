const express = require('express');
const {
    CreateTask, StarTask, BinTask, GetAllTasks, UpdateTask, GetAllStarredTasks, GetAllTrashedTasks, GetAllRemainderTasks,
}=require('../controller/taskCtrl')
const router=express.Router();

router.post("/create",CreateTask)
router.put("/starred",StarTask)
router.put("/trashed",BinTask)
router.put("/update",UpdateTask)
router.post("/all",GetAllTasks)
router.post("/starred",GetAllStarredTasks)
router.post("/trashed",GetAllTrashedTasks)
router.post("/remainder",GetAllRemainderTasks)
module.exports=router;
 