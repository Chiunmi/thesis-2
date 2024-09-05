const mongoose = require('mongoose');

const educationInfoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    educationLevel: {
        type: String,
        enum: ['JHS', 'SHS', 'College'],
        default: 'JHS'
    },
    yearlvl: {
        type: String,
        enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        default: '7'
    },
    section: {
        type: String,
        enum: ['A', 'B', 'C', 'D'],
        default: 'A'
    },
    department: {
        type: String,
        enum: ['COI', 'YES'],
        default: 'COI'
    },
    strand: {
        type: String,
        enum: ['STEM', 'HUMMS', 'ABM', 'IT'],
        default: null
    },
    course: {
        type: String,
        enum: ['BSCS', 'BSA', 'BSIT', 'BSE'],
        default: null
    },
    schoolYear: {
        type: String,
        default: 'N/A'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
  });

  educationInfoSchema.index({
    educationLevel: 1,
    yearlvl: 1,
    strand: 1,
    course: 1,
    section: 1
});

module.exports = mongoose.model('EducationInfo', educationInfoSchema);