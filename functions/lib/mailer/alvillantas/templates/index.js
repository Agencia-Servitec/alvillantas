"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const htmlTemplate = (url) => (0, fs_1.readFileSync)(path_1.default.join(__dirname, url)).toString();
exports.template = {
    contactEmailReceptor: htmlTemplate("./contactEmailReceptor.html"),
    contactEmailEmisor: htmlTemplate("./contactEmailEmisor.html"),
};
//# sourceMappingURL=index.js.map