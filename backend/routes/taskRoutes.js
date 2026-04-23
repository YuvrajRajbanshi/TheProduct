const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateTaskData } = require("../middlewares/validation");

// All task routes require authentication
router.use(authMiddleware);

router.get("/", getAllTasks);
router.post("/", validateTaskData, createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
