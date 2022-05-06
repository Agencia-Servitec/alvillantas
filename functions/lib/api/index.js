"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const _middlewares_1 = require("./_middlewares");
const express_validator_1 = require("express-validator");
const alvillantas_1 = require("./alvillantas");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => res.status(200).send("Welcome!").end());
app.post("/contact", [
    (0, express_validator_1.body)("contact.firstName").exists(),
    (0, express_validator_1.body)("contact.lastName").exists(),
    (0, express_validator_1.body)("contact.email").exists(),
    (0, express_validator_1.body)("contact.phone").exists(),
], _middlewares_1.validateRequest, alvillantas_1.PostContact);
app.use(_middlewares_1.errorHandler);
//# sourceMappingURL=index.js.map