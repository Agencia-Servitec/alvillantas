import { logger } from "../../utils";
import { NextFunction, Request, Response } from "express";
import {
  sendMailContactEmisor,
  sendMailContactReceptor,
} from "../../mailer/alvillantas";
import { firestore } from "../../_firebase";
import { assign, capitalize } from "lodash";
import moment, { Moment } from "moment";
import { uniq } from "../../utils/abstract";

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
  const contactId = firestore.collection("contacts").doc().id;

  await firestore
    .collection("contacts")
    .doc(contactId)
    .set(mapContact(contactId, contact));
};

const mapContact = (contactId: string, contact: ContactAlvillantas) => {
  const createAt = moment();
  return assign(
    {},
    { ...contact },
    {
      id: contactId,
      issue: capitalize(contact.issue),
      firstName: contact.firstName.toLowerCase(),
      lastName: contact.lastName.toLowerCase(),
      email: contact.email.toLowerCase(),
      searchData: searchData(contactId, createAt, contact),
      status: "pending",
      createAt: createAt,
    }
  );
};

const searchData = (
  contactId: string,
  createAt: Moment,
  contact: ContactAlvillantas
): string[] => {
  const strings = [
    contactId,
    ...contact.firstName.split(" "),
    ...contact.lastName.split(" "),
    contact.phoneNumber,
    contact.email,
    contact?.hostname || "",
    contact.status || "pending",
    moment(createAt).format("DD/MM/YYYY"),
  ].filter((string) => string);

  logger.log("[SEARCH-DATA]", strings);

  return uniq(strings);
};
