"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailContactEmisor = void 0;
const templates_1 = require("./templates");
const sendMail_1 = require("../sendMail");
const lodash_1 = require("lodash");
const sendMailContactEmisor = async (contact, to, bcc) => await (0, sendMail_1.sendMail)({
    to: contact.email,
    subject: "Gracias por su mensaje",
    html: (0, sendMail_1.html)(templates_1.template.contactEmailEmisor, mapMail(contact)),
});
exports.sendMailContactEmisor = sendMailContactEmisor;
const mapMail = (contact) => ({
    contact: (0, lodash_1.assign)({}, contact, Object.assign({ firstName: contact.firstName, lastName: contact.lastName, email: contact.email, phoneNumber: contact.phoneNumber }, (contact.message && {
        message: contact.message,
    }))),
});
//# sourceMappingURL=sendMailContactEmisor.js.map