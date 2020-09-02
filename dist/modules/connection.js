"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Mongo DB connection via mongoose
var mongoose = require('mongoose');
var message_1 = require("./utils/enums/message");
var mongoConnectionString = process.env.CONNECTION_STRING;
function db() {
    return mongoose.connect(mongoConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(function () {
        console.log(message_1.Messages.CONNECTED_TO_DATABASE);
    }).catch(function (err) {
        console.log(message_1.Messages.DB_ERROR + " " + err.message);
    });
}
exports.db = db;
