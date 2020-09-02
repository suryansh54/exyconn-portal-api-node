"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var sendPlainMail = function (mailOptions) {
    sgMail.send(mailOptions);
};
exports.sendPlainMail = sendPlainMail;
