"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/* User */
var userSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    mobile: {
        type: String,
        unique: true,
        trim: true
    },
    alternate_no: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        password: [true, 'Password is required']
    },
    role: {
        type: String,
        default: 'basic',
        enum: ['basic', 'admin']
    },
    created_at: {
        type: String,
        unique: true,
        trim: true
    },
    updated_at: {
        type: String,
        trim: true
    },
    deleted_at: {
        type: String,
        trim: true
    }
});
var userModel = mongoose.model('User', userSchema);
exports.userModel = userModel;
/* OTP */
var OTPSchema = new Schema({
    temp_id: String,
    email: String,
    id: String,
    mobile: String,
    otp: String,
    creationDate: String,
    expiryDate: String
});
var OTPModel = mongoose.model('Otp', OTPSchema);
exports.OTPModel = OTPModel;
