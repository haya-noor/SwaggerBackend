"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTsoaResponse = void 0;
function createTsoaResponse(res) {
    return (status, data, headers) => {
        if (headers) {
            res.set(headers);
        }
        return res.status(status).json(data);
    };
}
exports.createTsoaResponse = createTsoaResponse;
