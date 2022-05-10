const Project = require('../models/project');
const { ProjectService } = require('../services/project');

class ProjectsController {
    static async createProject(req, res) {
        const project = new Project(req.body);

        try {
            const newProject = await ProjectService.create(project);

            const result = {
                success: true,
                project: newProject,
                message: 'Project created!'
            };

            return res.status(201).json(result);
        } catch (err) {
            return res.status(500).json({ errors: 'server errror' });
        }
    }

    static async updateProject(req, res) {
        const body = req.body;

        try {
            const project = await ProjectService.findById(req.params.id);

            if (!project) {
                return res.status(404).json({
                    message: 'Project not found!'
                });
            }

            project.name = body.name;

            const updatedProject = await ProjectService.update(project);

            const result = {
                success: true,
                project: updatedProject,
                message: 'Project updated!'
            };

            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({ errors: 'server errror' });
        }
    }

    static async deleteProject(req, res) {
        try {
            const project = await ProjectService.findById(req.params.id);

            if (!project) {
                return res.status(404).json({ success: false, error: `Project not found` });
            }

            ProjectService.delete(project._id);

            const result = {
                success: true,
                id: project._id,
                message: 'Project deleted!'
            };

            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({ errors: 'server errror' });
        }
    }

    static async getProjectById(req, res) {
        try {
            const project = await ProjectService.findById(req.params.id);
            if (!project) {
                return res.status(404).json({ success: false, error: `Project not found` });
            }

            return res.status(200).json({ success: true, data: project });
        } catch (err) {
            return res.status(500).json({ errors: 'server errror' });
        }
    }

    static async getProjects(req, res) {
        try {
            const projects = await ProjectService.getAll();

            if (!projects.length) {
                return res.status(404).json({ success: false, error: `Project not found` });
            }

            return res.status(200).json({ success: true, data: projects });
        } catch (err) {
            return res.status(500).json({ errors: 'server errror' });
        }
        
    }
    static async getProject(req, res) {
        try {
            const project = await ProjectService.findById(req.params.id);

            if (!project) {
                return res.status(404).json({
                    success: false,
                    errors: 'Project not found'
                });
            }

            return res.status(200).json({
                success: true,
                project
            });
        } catch (err) {
            return res.status(500).json({ errors: 'server errror' });
        }
    }
}

module.exports = { ProjectsController };
