const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: { 
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    url: String,
    limit: {
        type: Number,
        default: null
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
});

eventSchema.index({ userId: 1 });
eventSchema.index({ startDate: 1 });
eventSchema.index({ endDate: 1 });

module.exports = mongoose.model('Event', eventSchema);