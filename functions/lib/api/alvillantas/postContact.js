"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostContact = void 0;
const utils_1 = require("../../utils");
const alvillantas_1 = require("../../mailer/alvillantas");
const PostContact = async (req, res, next) => {
    try {
        const { body: contact } = req;
        utils_1.logger.log("「Contact alvillantas」Initialize", {
            body: req.body,
        });
        if (!contact)
            res.status(412).send("error_no_found_contact_data").end();
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
//# sourceMappingURL=postContact.js.map