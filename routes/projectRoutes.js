const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { createProjectValidator } = require('../validators/projectValidator');
const authMiddleware = require('../middleware/auth');  // Assume auth middleware sets req.user

router.use(authMiddleware);

router.post('/api/projects', createProjectValidator, projectController.createProject);
router.get('/api/projects', projectController.getProjects);

module.exports = router;