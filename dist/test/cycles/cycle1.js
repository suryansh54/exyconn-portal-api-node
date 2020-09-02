"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Test modules */
var supertest_1 = __importDefault(require("supertest"));
var chai_1 = __importDefault(require("chai"));
/* Main app */
var app_1 = __importDefault(require("../../app"));
/* Config modules */
var config_test_1 = __importDefault(require("../config.test"));
/* Utils */
var common_1 = __importDefault(require("../utils/common"));
/* Public variables */
var expect = chai_1.default.expect;
var request = supertest_1.default(app_1.default);
var cycle1 = function () {
    var token = null;
    // Signup user
    // describe('Testing Auth Route for User', () => {
    //   it('Signup user create', (done) => {
    //     request.post('/v1/api/register')
    //       .send({ name: userObj.name, email: userObj.email, mobile: userObj.mobile, password: userObj.password })
    //       .set('Accept', 'application/json')
    //       .set('Content-Type', 'application/json')
    //       .expect(200)
    //       .end(function (err: any, res: any) {
    //         if (err)
    //           return done(err);
    //         done();
    //       });
    //   });
    it('Login user (Generate token)', function (done) {
        request.post('/v1/api/token')
            .send({ email: config_test_1.default.email, password: config_test_1.default.password })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function (err, res) {
            token = res.body.data[0].token;
            expect(res.body.status).to.be.a('string');
            common_1.default(res.body.message, 'Logged In successfully');
            common_1.default(res.body.data[0].userEmail, config_test_1.default.email);
            if (err) {
                return done(err);
            }
            done();
        });
    });
    // Login user
    // it('Login user (Generate token)', (done) => {
    // request.post('/v1/api/token')
    //   .send({ email: userObj.email, password: userObj.password })
    //   .set('Accept', 'application/json')
    //   .set('Content-Type', 'application/json')
    //   .expect(200)
    //   .end(function (err: any, res: any) {
    //     token = res.body.data[0].token;
    //     expect(res.body.status).to.be.a('string');
    //     verifyResponseItems(res.body.message, "Logged In successfully");
    //     verifyResponseItems(res.body.data[0].userEmail, userObj.email);
    //     if (err)
    //       return done(err);
    //     done();
    //   });
    // });
    // });
    console.log('df', token);
    return token;
};
exports.default = cycle1;
