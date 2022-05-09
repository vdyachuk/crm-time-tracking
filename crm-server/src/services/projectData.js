const ProjectData = require('../models/projectData');

class ProjectDataService {
    static findById(projectDataId) {
        return ProjectData.findOne({ _id: projectDataId });
    }

    static getAll() {
        return ProjectData.find({});
    }

    static create(projectData) {
        return ProjectData.create(projectData);
    }

    static update(projectData) {
        return ProjectData.findOneAndUpdate({ _id: projectData._id }, projectData, {
            new: true
        });
    }

    static delete(projectDataId) {
        ProjectData.deleteOne({ _id: projectDataId });
    }
}

module.exports = { ProjectDataService };