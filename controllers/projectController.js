// controllers/projectController.js
const { validationResult } = require('express-validator');
const projectService = require('../services/projectService');

async function createProject(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const project = await projectService.createProject(req.body, req.user.id);
    res.json({ success: true, project });
  } catch (error) {
    
  }
}

async function getProjects(req, res) {
  try {
    const projects = await projectService.getProjects(req.user.id);
    res.json({ success: true, projects });
  } catch (error) {
    
  }
}

module.exports = { createProject, getProjects };
