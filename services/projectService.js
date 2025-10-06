const Project = require('../models/Project');

async function createProject(data, userId) {
  const project = new Project({ ...data, createdBy: userId });
  await project.save();
  return project;
}

module.exports = { createProject }