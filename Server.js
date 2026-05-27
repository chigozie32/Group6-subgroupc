const express = require("express");

const app = express();

app.use(express.json());


// Fake database
let tasks = [
  {
    id: 1,
    title: "Learn Express",
    description: "Study backend basics",
    status: "in progress",
    priority: "high"
  },

  {
    id: 2,
    title: "Build API",
    description: "Create CRUD routes",
    status: "pending",
    priority: "medium"
  }
];


// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Welcome to Task Manager API");
});


// GET ALL TASKS
app.get("/tasks", (req, res) => {
  res.json(tasks);
});


// GET SINGLE TASK
app.get("/tasks/:id", (req, res) => {

  const taskId = parseInt(req.params.id);

  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.json(task);
});


// CREATE TASK
app.post("/tasks", (req, res) => {

  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority
  };

  tasks.push(newTask);

  res.status(201).json({
    message: "Task created successfully",
    task: newTask
  });
});


// UPDATE TASK
app.put("/tasks/:id", (req, res) => {

  const taskId = parseInt(req.params.id);

  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.status = req.body.status || task.status;
  task.priority = req.body.priority || task.priority;

  res.json({
    message: "Task updated successfully",
    updatedTask: task
  });
});


// DELETE TASK
app.delete("/tasks/:id", (req, res) => {

  const taskId = parseInt(req.params.id);

  tasks = tasks.filter(t => t.id !== taskId);

  res.json({
    message: "Task deleted successfully"
  });
});


// SERVER
app.listen(3000, () => {
  console.log("Server running on port 3000");
});