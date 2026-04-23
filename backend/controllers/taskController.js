const { Task } = require("../models");

const getAllTasks = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const tasks = await Task.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.json({
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description: description || null,
      status: status || "Pending",
      userId,
    });

    res.status(201).json({
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const { title, description, status } = req.body;

    // Verify task ownership
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this task" });
    }

    // Update task
    await task.update({
      title: title !== undefined ? title : task.title,
      description: description !== undefined ? description : task.description,
      status: status !== undefined ? status : task.status,
    });

    res.json({
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    // Verify task ownership
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this task" });
    }

    // Delete task
    await task.destroy();

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
