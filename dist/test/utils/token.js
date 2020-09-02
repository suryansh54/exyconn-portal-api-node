"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../../app"));
var request = supertest_1.default(app_1.default);
function token(credential, auth) {
    return function (done) {
        request
            .post('/auth/local')
            .send(credential)
            .expect(200)
            .end(onResponse);
        function onResponse(err, res) {
            auth.token = res.body.data[0].token;
            return done();
        }
    };
}
exports.default = token;
