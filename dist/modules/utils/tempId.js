"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tempID = function (tempIDLength) {
    if (tempIDLength === void 0) { tempIDLength = 10; }
    var digits = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var id = '';
    for (var i = 1; i <= tempIDLength; i++) {
        var index = Math.floor(Math.random() * (digits.length));
        id = id + digits[index];
    }
    return id;
};
exports.default = tempID;
