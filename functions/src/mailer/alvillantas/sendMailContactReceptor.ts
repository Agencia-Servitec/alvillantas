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
    subject: "Web contácto",
    html: html(template.contactEmailReceptor, mapMail(contact)),
  });

const mapMail = (contact: ContactAlvillantas): Mail => ({
  contact: assign({}, contact, {
    firstName: capitalize(contact.firstName),
    lastName: contact.lastName,
    email: contact.email,
    phoneNumber: contact.phoneNumber,
    ...(contact.message && {
      message: contact.message,
    }),
  }),
});
