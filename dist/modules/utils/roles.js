"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server/roles.js
var AccessControl = require('accesscontrol');
var ac = new AccessControl();
var roles = (function () {
    ac.grant('basic')
        .readOwn('profile')
        .updateOwn('profile');
    ac.grant('admin')
        .extend('basic')
        .updateAny('profile')
        .deleteAny('profile')
        .read('getAllUsers');
    return ac;
})();
exports.default = roles;
