const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Requested', 'Accepted', 'Completed', 'Cancelled'],
        default: 'Requested'
    },
    messages: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            name: String,
            text: String,
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ],
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    feedback: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ServiceRequestModel = mongoose.model('ServiceRequest', serviceRequestSchema);

module.exports = ServiceRequestModel;
