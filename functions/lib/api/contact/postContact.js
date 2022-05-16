"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostContact = void 0;
const utils_1 = require("../../utils");
const alvillantas_1 = require("../../mailer/alvillantas");
const _firebase_1 = require("../../_firebase");
const lodash_1 = require("lodash");
const moment_1 = __importDefault(require("moment"));
const abstract_1 = require("../../utils/abstract");
const PostContact = async (req, res, next) => {
    try {
        const { body: contact } = req;
        utils_1.logger.log("「Contact alvillantas」Initialize", {
            body: req.body,
        });
        if (!contact)
            res.status(412).send("error_no_found_contact_data").end();
        await setContactUsers(contact.contact);
        await (0, alvillantas_1.sendMailContactReceptor)(contact.contact);
        await (0, alvillantas_1.sendMailContactEmisor)(contact.contact);
        res.sendStatus(200).end();
    }
    catch (error) {
        utils_1.logger.error(error);
        next(error);
    }
};
exports.PostContact = PostContact;
const setContactUsers = async (contact) => {
    const contactId = _firebase_1.firestore.collection("contacts").doc().id;
    await _firebase_1.firestore
        .collection("contacts")
        .doc(contactId)
        .set(mapContact(contactId, contact));
};
const mapContact = (contactId, contact) => {
    const createAt = (0, moment_1.default)();
    return (0, lodash_1.assign)({}, Object.assign({}, contact), {
        id: contactId,
        issue: (0, lodash_1.capitalize)(contact.issue),
        firstName: contact.firstName.toLowerCase(),
        lastName: contact.lastName.toLowerCase(),
        email: contact.email.toLowerCase(),
        searchData: searchData(contactId, createAt, contact),
        status: "pending",
        createAt: createAt,
    });
};
const searchData = (contactId, createAt, contact) => {
    const strings = [
        contactId,
        ...contact.firstName.split(" "),
        ...contact.lastName.split(" "),
        contact.phoneNumber,
        contact.email,
        (contact === null || contact === void 0 ? void 0 : contact.hostname) || "",
        contact.status || "pending",
        (0, moment_1.default)(createAt).format("DD/MM/YYYY"),
    ].filter((string) => string);
    utils_1.logger.log("[SEARCH-DATA]", strings);
    return (0, abstract_1.uniq)(strings);
};
//# sourceMappingURL=postContact.js.map