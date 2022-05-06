"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeFormat = void 0;
const moment_1 = __importDefault(require("moment"));
const timeFormat = (millisecondsDiff) => {
    let time = "";
    const daysDiff = moment_1.default.duration(millisecondsDiff).days();
    const hoursDiff = moment_1.default.duration(millisecondsDiff).hours();
    const minutesDiff = moment_1.default.duration(millisecondsDiff).minutes();
    if (minutesDiff > 0)
        time = `${minutesDiff}m`;
    if (hoursDiff > 0)
        time = `${hoursDiff}h ${time}`;
    if (daysDiff > 0)
        time = `${daysDiff}d ${time}`;
    return time;
};
exports.timeFormat = timeFormat;
//# sourceMappingURL=timeFormat.js.map