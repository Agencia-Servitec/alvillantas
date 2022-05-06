"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptBase64 = exports.encryptHmacSha256 = exports.encryptSha256 = void 0;
const sha256_1 = __importDefault(require("crypto-js/sha256"));
const hmac_sha256_1 = __importDefault(require("crypto-js/hmac-sha256"));
const encryptSha256 = (text) => (0, sha256_1.default)(text).toString();
exports.encryptSha256 = encryptSha256;
const encryptHmacSha256 = (message, secret) => (0, hmac_sha256_1.default)(message, secret).toString();
exports.encryptHmacSha256 = encryptHmacSha256;
const encryptBase64 = (string) => {
    const buffer = Buffer.from(string, "utf-8");
    return buffer.toString("base64");
};
exports.encryptBase64 = encryptBase64;
//# sourceMappingURL=encryption.js.map