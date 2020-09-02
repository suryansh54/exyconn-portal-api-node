"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var truncateHTML = require('truncate-html');
var ReqContactQueryModel = /** @class */ (function () {
    function ReqContactQueryModel(req) {
        this.incidentID = req.incidentID;
        this.subject = req.subject;
        this.description = req.description;
        this.userID = req.userID;
    }
    return ReqContactQueryModel;
}());
exports.ReqContactQueryModel = ReqContactQueryModel;
var ContactQueryModel = /** @class */ (function () {
    function ContactQueryModel(res) {
        this.incidentID = res.incidentID;
        this.status = res.status;
    }
    return ContactQueryModel;
}());
exports.ContactQueryModel = ContactQueryModel;
var ContactQueryResponseModel = /** @class */ (function () {
    function ContactQueryResponseModel(res) {
        this.incidentID = res.incidentID;
        this.status = res.status;
        this.Date = res.Date;
        this.subject = res.subject;
        this.description = truncateHTML(res.description, 25);
    }
    return ContactQueryResponseModel;
}());
exports.ContactQueryResponseModel = ContactQueryResponseModel;
