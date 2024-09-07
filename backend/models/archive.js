const mongoose = require('mongoose');

const archiveSchema = new mongoose.Schema({
    documentId: { // The ID of the document being tracked
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    collectionName: { // Name of the collection the document belongs to
        type: String,
        required: true,
    },
    originalDocument: { // The original state of the document
        type: Object,
        required: true
    },
    changes: [ // Array of changes made to the document over time
        {
            userId: { // Who made the change
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            changedFields: { // Only the fields that were changed
                type: Object,
                required: true
            },
            timestamp: { // When the change was made
                type: Date,
                default: Date.now
            }
        }   
    ]
});

module.exports = mongoose.model('Archive', archiveSchema);