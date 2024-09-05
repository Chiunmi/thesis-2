const mongoose = require('mongoose');

const followUpSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    followUpComplaints: {
        type: String,
        required: true,
    },
    followUpActions: {
        type: String,
        default: 'N/A',
    }
});

const assessmentSchema = new mongoose.Schema({
    userId: { //student id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    complain: {
        type: String,
        required: true,
    },
    actions: {
        type: String,
        required: true,
    },
    timestmap: {
        type: Date,
        default: Date.now,
        required: true,
    },
    followUps: [followUpSchema] // Array of follow-up sub-documents
});

module.exports = mongoose.model('Assessment', assessmentSchema);
