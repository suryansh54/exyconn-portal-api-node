"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Environment variables
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Dependencies
var express_1 = __importDefault(require("express"));
var app = require('express')();
var cors = require('cors');
var swaggerUi = require('swagger-ui-express');
var bodyParser = require('body-parser');
var rateLimit = require('express-rate-limit');
var swaggerDocument = require('./swagger/swagger.json');
// Custom Dependencies
var connection_1 = require("./modules/connection");
var upload_1 = __importDefault(require("./modules/routes/upload"));
var message_1 = require("./modules/utils/enums/message");
// Port
var port = process.env.PORT || 3001;
// Root variables
var limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 200,
});
// Routing imports
var auth_1 = __importDefault(require("./modules/routes/auth"));
var admin_1 = __importDefault(require("./modules/routes/admin"));
var oauth_1 = __importDefault(require("./modules/routes/oauth"));
var user_1 = __importDefault(require("./modules/routes/user"));
var query_1 = __importDefault(require("./modules/routes/query"));
var otpVerification_1 = __importDefault(require("./modules/routes/otpVerification"));
// Reporting Modules
var path = require('path');
/* -----------Middleware-----------|START---- */
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(limiter);
/* -----------Middleware-----------|END---- */
/* -----------Swagger-----------|START---- */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
/* -----------Swagger-----------|END---- */
/* -----------Routes-----------|START---- */
app.use('/v1/api', auth_1.default);
app.use('/v1/api', upload_1.default);
app.use('/v1/api/admin', admin_1.default);
app.use('/v1/api/oauth', oauth_1.default);
app.use('/v1/api', user_1.default);
app.use('/v1/api', query_1.default);
app.use('/v1/api', otpVerification_1.default);
app.use('/files', express_1.default.static('uploads'));
/* -----------Routes-----------|START---- */
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connection_1.db()];
            case 1:
                _a.sent();
                app.listen(port, '0.0.0.0', function () {
                    return console.log(message_1.Messages.PORT_LISTEN + " " + port + "!");
                });
                app.get('/', function (req, res) { return res.send(message_1.Messages.WELCOME); });
                return [2 /*return*/];
        }
    });
}); };
startServer();
app.use(express_1.default.static('mochawesome-report'));
exports.default = app;
