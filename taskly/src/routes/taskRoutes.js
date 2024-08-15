const express = require("express");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  assignTask,
  addComment,
  getComments,
  uploadAttachment
} = require("../controllers/taskController");
const router = express.Router();
const cache = require("../middleware/cache").cache;

router.route("/boards/:boardId/tasks").post(createTask);
router.get("/boards/:boardId/tasks", cache, getTasks);
router.get("/tasks/:id", cache, getTask);
router.route("/tasks/:id").put(updateTask).delete(deleteTask);
router.route("/tasks/:id/assign").put(assignTask);
router.route("/tasks/:id/comments").post(addComment).get(getComments);
router.route("/tasks/:id/attachments").post(uploadAttachment);

module.exports = router;
