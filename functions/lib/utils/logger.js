"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger_1 = require("firebase-functions/lib/logger");
exports.logger = { log: logger_1.log, info: logger_1.info, warn: logger_1.warn, error: logger_1.error, write: logger_1.write };
//# sourceMappingURL=logger.js.map