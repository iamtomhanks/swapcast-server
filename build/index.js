"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
require('dotenv').config();
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mysql_1 = __importDefault(require("mysql"));
// @ts-ignore
var types = __importStar(require("swapcast-types"));
console.log({ types: types });
var app = express_1.default();
// const path = require('path');
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(body_parser_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,GET,POST");
    next();
});
var connection = mysql_1.default.createConnection({
    host: "" + process.env.DB_HOST,
    user: "" + process.env.DB_USER,
    password: "" + process.env.DB_PASSWORD,
    database: "" + process.env.DB_DATABASE
});
connection.connect(function (err) {
    if (err)
        throw err;
    console.log('connected as id ' + connection.threadId);
    // Routes
    // require('./Routes/Auth')(app, connection);
});
app.listen(3001);
console.log('Listening on port 3001');
