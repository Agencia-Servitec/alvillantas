"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectUrlEncoder = void 0;
const url_1 = __importDefault(require("url"));
const lodash_1 = require("lodash");
const objectUrlEncoder = (object) => {
    const urlSearchParams = new url_1.default.URLSearchParams();
    Object.entries(object).forEach(([key, value]) => {
        if ((0, lodash_1.isObject)(value) || (0, lodash_1.isArray)(value)) {
            let valueToString = JSON.stringify(value);
            valueToString = (0, lodash_1.replace)(valueToString, /\\/g, "");
            urlSearchParams.append(key, valueToString);
        }
        else {
            urlSearchParams.append(key, (0, lodash_1.toString)(value));
        }
    });
    return urlSearchParams.toString();
};
exports.objectUrlEncoder = objectUrlEncoder;
//# sourceMappingURL=convertor.js.map