const Task = require('../models/Task');

// get all task 
const getAllTasks = async (req, res) => {
   try {
      const tasks = await Task.find({});
      if(!tasks){
         return res.status(404).json({msg: `No task in database`});
      }
      res.status(200).json({ tasks })
   } catch (error) {
      res.status(500).json({ msg: error })
   }
   
}
//create a task 
const createTask = async (req, res) => {
   try {
      const task = await Task.create(req.body)
      res.status(201).json({ task })

   }
   catch (error) {
      res.status(500).json({ msg: error })

   }

}

//get task by a specific id 

const getTask = async (req, res) => {
   try {
      const { id: taskID } = req.params;
      const task = await Task.findOne({ _id: taskID });
      if (!task) {
         return res.status(404).json({ msg: `No task with id : ${taskID}` })
      }
      res.status(200).json({ task })

   } catch (error) {
      res.status(500).json({ msg: error })
   }

}
//update task 
//update task 
const updateTask = async (req, res) => {
   try {
      const { id: taskID } = req.params;
      const task = await Task.findOneAndUpdate({ _id: taskID }, req.body,{
         new:true ,
         runValidators: true,
      });

      if (!task) {
         return res.status(404).json({ msg: `No task with id : ${taskID}` });
      }

      // Send a response with the updated task data
      res.status(200).json({ id: taskID, data: req.body });
   } catch (error) {
      res.status(500).json({ msg: error });
   }
}


//delete task 
const deleteTask = async (req, res) => {
   try {
      const { id: taskID } = req.params;
      const task = await Task.findOneAndDelete({ _id: taskID });
      if (!task) {
         return res.status(404).json({ msg: `No task with id : ${taskID}` });
      }
      res.status(200).json({ task });
   } catch (error) {
      res.status(500).json({ msg: error });
   }
};


module.exports = {
   getAllTasks, createTask, getTask, updateTask, deleteTask,
}

// module.exports = getAllTasks