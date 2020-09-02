import { NextFunction } from 'express';
const mongoose = require('mongoose');
const contactSchema  = new mongoose.Schema({
    incidentID: {
        type: Number
    },
    userID : {
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


const contactQuery = mongoose.model('contact', contactSchema);

export { contactQuery };
