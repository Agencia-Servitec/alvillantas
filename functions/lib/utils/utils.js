"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchName = exports.mapApiImage = exports.isDate = exports.normalize = void 0;
const moment_1 = __importDefault(require("moment"));
const normalize_text_1 = require("normalize-text");
const lodash_1 = require("lodash");
const normalize = (field) => {
    const regex = /[.,\s]+/g;
    return (0, normalize_text_1.normalizeText)(field.toUpperCase()).replace(regex, " ");
};
exports.normalize = normalize;
const isDate = (date) => (0, moment_1.default)(date, "YYYY-MM-DD", true).isValid();
exports.isDate = isDate;
const mapApiImage = (image) => {
    var _a;
    return (Object.assign(Object.assign({}, image), { createAt: (_a = image.createAt) === null || _a === void 0 ? void 0 : _a.toDate() }));
};
exports.mapApiImage = mapApiImage;
const searchName = (names) => names
    .filter((name) => name)
    .map((name) => (0, lodash_1.toString)(name)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, ""));
exports.searchName = searchName;
//# sourceMappingURL=utils.js.map