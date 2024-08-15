const Task = require("../models/task");
const Board = require("../models/Board");
const mongoose = require("mongoose");

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const { boardId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(boardId)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid board ID" });
    }
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ success: false, error: "Board not found" });
    }
    const task = await Task.create({
      title,
      description,
      dueDate,
      boardId,
      user: req.user.id
    });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all tasks for a board
exports.getTasks = async (req, res) => {
  const { boardId } = req.params;
  try {
    const tasks = await Task.find({ boardId });
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get a single task by ID
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }
    await task.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Assign a task to a user
exports.assignTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }
    task.assignedTo = req.body.userId;
    await task.save();
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Add a comment to a task
exports.addComment = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }
    const comment = {
      text: req.body.text,
      user: req.user.id
    };
    task.comments.push(comment);
    await task.save();
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all comments for a task
exports.getComments = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }
    res.status(200).json({ success: true, data: task.comments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Upload an attachment to a task
exports.uploadAttachment = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }
    const attachment = {
      url: req.body.url,
      fileType: req.body.fileType
    };
    task.attachments.push(attachment);
    await task.save();
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
