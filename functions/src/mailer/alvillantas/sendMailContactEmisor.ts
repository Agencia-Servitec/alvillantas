import { template } from "./templates";
import { html, sendMail } from "../sendMail";
import { assign, capitalize } from "lodash";

interface Mail {
  contact: ContactAlvillantas;
  hostNameAlvillantas: boolean;
  hostNameHankookAlvillantas: boolean;
}

export const sendMailContactEmisor = async (
  contact: ContactAlvillantas,
  to?: string,
  bcc?: string
): Promise<void> =>
  await sendMail({
    to: contact.email,
    subject: "Gracias por contáctarnos",
    html: html(template.contactEmailEmisor, mapMail(contact)),
  });

const mapMail = (contact: ContactAlvillantas): Mail => ({
  contact: assign({}, contact, {
    firstName: capitalize(contact.firstName),
  }),
  hostNameAlvillantas:
    contact.hostname === "alvillantas.com" ||
    contact.hostname === "www.alvillantas.com",
  hostNameHankookAlvillantas: contact.hostname === "hankookalvillantas.com",
});
