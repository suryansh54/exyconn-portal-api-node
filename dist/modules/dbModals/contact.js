"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var contactSchema = new mongoose.Schema({
    incidentID: {
        type: Number
    },
    userID: {
        type: String,
    },
    Date: {
        type: Number
    },
    subject: {
        type: String,
        required: [true, 'Please enter a subject.']
    },
    description: {
        type: String,
        required: [true, 'Please state your Query.']
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Successful', 'Rejected']
    }
});
var contactQuery = mongoose.model('contact', contactSchema);
exports.contactQuery = contactQuery;
