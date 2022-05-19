const projectDataRouter = require('express').Router();

const { ProjectsDataController } = require('../controllers/projectsData');
const { validation } = require('../utils/validation');
const { createProjectDataValidator } = require('../validations/projectsData');

projectDataRouter.route('/').post(validation(createProjectDataValidator), ProjectsDataController.createProjectData);
projectDataRouter.route('/:id').put(validation(createProjectDataValidator), ProjectsDataController.updateProjectData);
projectDataRouter.route('/').delete(ProjectsDataController.deletProjectsData);
projectDataRouter.route('/').get(ProjectsDataController.getProjectsData);

module.exports = projectDataRouter;