import express from "express";
import cors from "cors";
import { validateRequest, errorHandler } from "./_middlewares";
import { body } from "express-validator";
import { PostContact as PostContactAlvillantas } from "./alvillantas";

const app: express.Application = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.status(200).send("Welcome!").end());

app.post(
  "/contact",
  [
    body("contact.firstName").exists(),
    body("contact.lastName").exists(),
    body("contact.email").exists(),
    body("contact.phone").exists(),
  ],
  validateRequest,
  PostContactAlvillantas
);

app.use(errorHandler);

export { app };
