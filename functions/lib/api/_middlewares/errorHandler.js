"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const utils_1 = require("../../utils");
const _utils_1 = require("../_utils");
const errorHandler = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next // next is required to detect "ErrorRequestHandler"
) => {
    const { body, query, params, headers, path } = req;
    utils_1.logger.error("Error Handler", req.originalUrl, {
        body,
        query,
        params,
        headers,
        path,
    });
    utils_1.logger.error(err);
    if ((0, _utils_1.isCreateApiError)(err)) {
        res.status(412).send(err.apiError).end();
    }
    else {
        res.status(500).end();
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map