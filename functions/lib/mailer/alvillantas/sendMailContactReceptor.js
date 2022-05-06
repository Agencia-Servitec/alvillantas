"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailContactReceptor = void 0;
const templates_1 = require("./templates");
const sendMail_1 = require("../sendMail");
const lodash_1 = require("lodash");
const config_1 = require("../../config");
const { mailer } = config_1.environmentConfig;
const sendMailContactReceptor = async (contact, to, bcc) => await (0, sendMail_1.sendMail)({
    to: mailer.contact.to,
    bcc: mailer.contact.bcc,
    subject: contact.issue
        ? (0, lodash_1.capitalize)(contact.issue)
        : "Alvillantas Web contácto",
    html: (0, sendMail_1.html)(templates_1.template.contactEmailReceptor, mapMail(contact)),
});
exports.sendMailContactReceptor = sendMailContactReceptor;
const mapMail = (contact) => ({
    contact: (0, lodash_1.assign)({}, contact, Object.assign(Object.assign({ firstName: (0, lodash_1.capitalize)(contact.firstName), lastName: contact.lastName, email: contact.email, phoneNumber: contact.phoneNumber }, (contact.issue && {
        issue: (0, lodash_1.capitalize)(contact.issue),
    })), (contact.message && {
        message: contact.message,
    }))),
});
//# sourceMappingURL=sendMailContactReceptor.js.map