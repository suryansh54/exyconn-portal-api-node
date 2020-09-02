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
/* Public variables */
var expect = chai_1.default.expect;
var request = supertest_1.default(app_1.default);
var cycle2 = function (token) {
    console.log('Suryanshaaaaa', token);
};
exports.default = cycle2;
