const { validationResult } = require('express-validator')
const taskService = require('../services/taskService')

async function createTask(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const task = await taskService.createTask(req.body, req.user.id);
    res.json({ success: true, task });
  } catch (error) {

  }
}

async function updateTask(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const task = await taskService.updateTask(req.params.id, req.body, req.user.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found or unauthorized' });
    res.json({ success: true, task });
  } catch (error) {

  }
}

async function deleteTask(req, res) {
  try {
    const task = await taskService.deleteTask(req.params.id, req.user.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found or unauthorized' });
    res.json({ success: true, message: 'Task deleted' });
  } catch (error) {
    
  }
}

async function getTasks(req, res) {
  try {
    const tasks = await taskService.getTasks(req.user.id);
    res.json({ success: true, tasks });
  } catch (error) {
    
  }
}

module.exports = { createTask, updateTask, deleteTask, getTasks }