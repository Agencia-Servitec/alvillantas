"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    errors.isEmpty() ? next() : res.status(400).send(errors.array()).end();
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validateRequest.js.map