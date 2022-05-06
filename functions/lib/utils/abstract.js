"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniq = void 0;
const uniq = (strings) => strings.map((string) => string
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, ""));
exports.uniq = uniq;
//# sourceMappingURL=abstract.js.map