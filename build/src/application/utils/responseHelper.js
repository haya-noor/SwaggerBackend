"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTsoaResponse = createTsoaResponse;
function createTsoaResponse(res) {
    return (status, data, headers) => {
        if (headers) {
            res.set(headers);
        }
        return res.status(status).json(data);
    };
}
