"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
app.use(require('prerender-node').set('prerenderToken', process.env.REACT_APP_PRERENDER_TOKEN));
