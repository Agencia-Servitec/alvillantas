"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorList = exports.apiError = exports.createApiError = exports.isCreateApiError = void 0;
const lodash_1 = require("lodash");
const isCreateApiError = (data) => (0, lodash_1.isObject)(data) && "isApiError" in data;
exports.isCreateApiError = isCreateApiError;
const createApiError = ({ message, key, }) => {
    const error = new Error(message);
    error.isApiError = true;
    error.apiError = (0, exports.apiError)({
        message: message,
        key: key,
    });
    return error;
};
exports.createApiError = createApiError;
const apiError = ({ message, key, }) => ({
    isApiError: true,
    message: message,
    key: key,
});
exports.apiError = apiError;
const apiErrorList = (keys) => keys.map((key) => ({
    key: key,
    message: "...",
    isApiError: true,
}));
exports.apiErrorList = apiErrorList;
//# sourceMappingURL=apiError.js.map