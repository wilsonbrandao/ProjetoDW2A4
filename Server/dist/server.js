"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors_1 = __importDefault(require("cors"));
const route_1 = require("./route");
const app = express();
app.use((0, cors_1.default)());
app.use(express.json());
app.use(route_1.routes);
app.listen(3333, () => {
    console.log("HTTP server listening on port " + 3333);
});
