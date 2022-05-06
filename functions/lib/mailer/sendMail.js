"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.html = exports.sendMail = void 0;
const mustache_1 = __importDefault(require("mustache"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
const { host, from, pass, user, port } = config_1.environmentConfig["node-mailer"];
const sendMail = async (mailOptions) => {
    mailOptions.from = `${from} <${user}>`;
    const transporter = nodemailer_1.default.createTransport({
        port,
        host,
        auth: {
            user,
            pass,
        },
    });
    await transporter.sendMail(mailOptions);
};
exports.sendMail = sendMail;
const html = (template, view) => mustache_1.default.render(template, view);
exports.html = html;
//# sourceMappingURL=sendMail.js.map