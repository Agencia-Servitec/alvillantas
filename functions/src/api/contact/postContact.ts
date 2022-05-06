import { logger } from "../../utils";
import { NextFunction, Request, Response } from "express";
import {
  sendMailContactEmisor,
  sendMailContactReceptor,
} from "../../mailer/alvillantas";
import { firestore } from "../../_firebase";
import { assign } from "lodash";
import moment from "moment";

interface Body {
  contact: ContactAlvillantas;
}

export const PostContact = async (
  req: Request<unknown, unknown, Body, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body: contact } = req;

    logger.log("「Contact alvillantas」Initialize", {
      body: req.body,
    });

    if (!contact) res.status(412).send("error_no_found_contact_data").end();

    await setContactUsers(contact.contact);

    await sendMailContactReceptor(contact.contact);
    await sendMailContactEmisor(contact.contact);

    res.sendStatus(200).end();
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const setContactUsers = async (contact: ContactAlvillantas) => {
  await firestore.collection("contacts").doc().set(mapContact(contact));
};

const mapContact = (contact: ContactAlvillantas) =>
  assign(
    {},
    { ...contact },
    {
      firstName: contact.firstName.toLowerCase(),
      lastName: contact.lastName.toLowerCase(),
      email: contact.email.toLowerCase(),
      createAt: moment(),
    }
  );
