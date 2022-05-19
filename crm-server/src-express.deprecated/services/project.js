const Project = require('../models/project');

class ProjectService {
    static findById(projectId) {
        return Project.findOne({ _id: projectId });
    }

    static getAll() {
        return Project.find({});
    }

    static create(project) {
        return Project.create(project);
    }

    static update(project) {
        return Project.findOneAndUpdate({ _id: project._id }, project, {
            new: true
        });
    }

    static delete(projectId) {
        Project.deleteOne({ _id: projectId });
    }
}

module.exports = { ProjectService };
