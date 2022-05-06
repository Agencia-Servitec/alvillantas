"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.environmentConfig = exports.isProduction = exports.currentEnvironment = void 0;
const config_json_1 = __importDefault(require("./config.json"));
exports.config = config_json_1.default;
const projectId = process.env.GCLOUD_PROJECT;
const currentEnvironment = projectId === "alvillantas-xxxxxx" ? "production" : "development";
exports.currentEnvironment = currentEnvironment;
const isProduction = currentEnvironment === "production";
exports.isProduction = isProduction;
const environmentConfig = Object.assign(Object.assign({}, config_json_1.default[currentEnvironment]), config_json_1.default.common);
exports.environmentConfig = environmentConfig;
//# sourceMappingURL=index.js.map