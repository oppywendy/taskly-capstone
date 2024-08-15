const Board = require("../models/Board");

// Create a new board
exports.createBoard = async (req, res) => {
  const { name, description } = req.body;
  const { organizationId } = req.params;

  try {
    const board = await Board.create({
      name,
      description,
      user: req.user.id,
      organization: organizationId
    });
    res.status(201).json({ success: true, data: board });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all boards for an organization
exports.getBoards = async (req, res) => {
  const { organizationId } = req.params;

  try {
    const boards = await Board.find({ organization: organizationId });
    res.status(200).json({ success: true, data: boards });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get a single board by ID
exports.getBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ success: false, error: "Board not found" });
    }
    res.status(200).json({ success: true, data: board });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update a board
exports.updateBoard = async (req, res) => {
  try {
    let board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ success: false, error: "Board not found" });
    }
    board = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: board });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete a board
exports.deleteBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ success: false, error: "Board not found" });
    }
    await board.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
