import { template } from "./templates";
import { html, sendMail } from "../sendMail";
import { assign, capitalize } from "lodash";
import { environmentConfig } from "../../config";

interface Mail {
  contact: ContactAlvillantas;
}

const { mailer } = environmentConfig;

export const sendMailContactReceptor = async (
  contact: ContactAlvillantas,
  to?: string,
  bcc?: string
): Promise<void> =>
  await sendMail({
    to: mailer.contact.to,
    bcc: mailer.contact.bcc,
    subject: contact.issue
      ? capitalize(contact.issue)
      : "Alvillantas Web contácto",
    html: html(template.contactEmailReceptor, mapMail(contact)),
  });

const mapMail = (contact: ContactAlvillantas): Mail => ({
  contact: assign({}, contact, {
    firstName: capitalize(contact.firstName),
    lastName: contact.lastName,
    email: contact.email,
    phoneNumber: contact.phoneNumber,
    ...(contact.issue && {
      issue: capitalize(contact.issue),
    }),
    ...(contact.message && {
      message: contact.message,
    }),
  }),
});
