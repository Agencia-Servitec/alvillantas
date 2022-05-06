import { template } from "./templates";
import { html, sendMail } from "../sendMail";
import { assign } from "lodash";

interface Mail {
  contact: ContactAlvillantas;
}

export const sendMailContactEmisor = async (
  contact: ContactAlvillantas,
  to?: string,
  bcc?: string
): Promise<void> =>
  await sendMail({
    to: contact.email,
    subject: "Gracias por su mensaje",
    html: html(template.contactEmailEmisor, mapMail(contact)),
  });

const mapMail = (contact: ContactAlvillantas): Mail => ({
  contact: assign({}, contact, {
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phoneNumber: contact.phoneNumber,
    ...(contact.message && {
      message: contact.message,
    }),
  }),
});
