const ProjectData = require('../models/projectData');
const { ProjectDataService } = require('../services/projectData');

class ProjectsDataController {
    static async createProjectData(req, res) {
        const projectData = new ProjectData(req.body);

        try {
            const newProjectData = await ProjectDataService.create(projectData);

            const result = {
                success: true,
                projectData: newProjectData,
                message: 'Project Data saved!'
            };

            return res.status(201).json(result);
        } catch (err) {
            return res.status(500).json({ errors: 'server errror' });
        }
    }

    static async updateProjectData(req, res) {
        const body = req.body;

        try {
            const projectData = await ProjectDataService.findById(req.params.id);

            if (!projectData) {
                return res.status(404).json({
                    message: 'Project data not found!'
                });
            }

            projectData.time = body.time;
            projectData.date = body.date;

            const updatedProjectData = await ProjectDataService.update(projectData);

            const result = {
                success: true,
                projectData: updatedProjectData,
                message: 'Project data updated!'
            };

            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({ errors: 'server errror' });
        }
    }
    static async getProjectsData(req, res) {
        try {
            const projectsData = await ProjectDataService.getAll();

            if (!projectsData.length) {
                return res.status(404).json({ success: false, error: `Project not found` });
            }

            return res.status(200).json({ success: true, data: projectsData });
        } catch (err) {
            return res.status(500).json({ errors: 'server errror' });
        }
    }
    static async deletProjectsData(req, res) {
        try {
            const projectData = await ProjectDataService.findById(req.params.id);

            if (!projectData) {
                return res.status(404).json({ success: false, error: `Project not found` });
            }

            ProjectDataService.delete(projectData._id);

            const result = {
                success: true,
                id: projectData._id,
                message: 'Project deleted!'
            };

            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({ errors: 'server errror' });
        }
    }
}

module.exports = { ProjectsDataController };
