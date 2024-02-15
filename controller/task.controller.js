const Task = require("../Schema/Task.schema"); // Import the ProjectIdea schema
const CustomError = require("../utils/error");
// Create a new task
const createTask = async (req, res, next) => {
  try {
    const { title, description, assignedDate, deadline, isApproved , facultyId,
        groupId} = req.body;
    const newTask = new Task({
      title,
      description,
      assignedDate,
      deadline,
      isApproved,
      facultyId,
      groupId
    });
    await newTask.save();
    res.status(201).json({
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// Get all tasks
const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// Get a single task by ID
const getTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return next(CustomError(404, "Task not found"));
    }
    res.status(200).json({
      message: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// Update a task by ID
const updateTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const { title, description, assignedDate, deadline, isApproved } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        assignedDate,
        deadline,
        isApproved,
      },
      { new: true }
    );
    if (!updatedTask) {
      return next(CustomError(404, "Task not found"));
    }
    res.status(200).json({
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// Delete a task by ID
const deleteTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return next(CustomError(404, "Task not found"));
    }
    res.status(200).json({
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

const updateApprovalStatus = async (req, res, next) => {
    try {
      const taskId = req.params.id;
      const { isApproved } = req.body;
  
      // Validate input
      if (typeof isApproved !== 'boolean') {
        return res.status(400).json({ success: false, message: "Invalid value for isApproved field" });
      }
  
      // Update the task
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { isApproved },
        { new: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
  
      res.status(200).json({ success: true, message: "Task approval status updated successfully", data: updatedTask });
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  updateApprovalStatus
};
