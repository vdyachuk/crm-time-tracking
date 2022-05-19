const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Project = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        
    },
    
);

module.exports = mongoose.model('Project', Project);