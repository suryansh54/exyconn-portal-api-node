"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_1 = require("./enums/message");
function isJson(err, req, res, next) {
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(500).json({
            status: message_1.StatusMessages.ERROR,
            message: message_1.Messages.NOT_VALID_JSON,
        });
    }
    else {
        next(err);
    }
}
exports.default = isJson;
