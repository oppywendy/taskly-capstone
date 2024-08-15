const express = require("express");
const {
  createBoard,
  getBoards,
  getBoard,
  updateBoard,
  deleteBoard
} = require("../controllers/boardController");
const router = express.Router();

router
  .route("/organizations/:organizationId/boards")
  .post(createBoard)
  .get(getBoards);

router.route("/boards/:id").get(getBoard).put(updateBoard).delete(deleteBoard);

module.exports = router;
