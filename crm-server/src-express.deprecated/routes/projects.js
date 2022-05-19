const projectRouter = require('express').Router();

const { ProjectsController } = require('../controllers/projects');
const { validation } = require('../utils/validation');
const { createProjectValidator } = require('../validations/projects');

projectRouter.route('/').post(validation(createProjectValidator), ProjectsController.createProject);
projectRouter.route('/:id').put(validation(createProjectValidator), ProjectsController.updateProject);
projectRouter.route('/:id').delete(ProjectsController.deleteProject);
projectRouter.route('/:id').get(ProjectsController.getProjectById);
projectRouter.route('/').get(ProjectsController.getProjects);
projectRouter.route('/').get(ProjectsController.getProject);

module.exports = projectRouter;