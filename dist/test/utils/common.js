"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var expect = chai_1.default.expect;
var verifyResponseItems = function (expector, matcher) {
    expect(expector).to.contain(matcher);
};
exports.default = verifyResponseItems;
