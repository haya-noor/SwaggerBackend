"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("./http");
class HttpResponse {
    statusCode;
    body;
    constructor(statusCode, body) {
        this.statusCode = statusCode;
        this.body = body;
    }
    static create(responseCode, body) {
        return new HttpResponse(responseCode, body);
    }
    static ok(body) {
        if ("message" in body) {
            return new HttpResponse(http_1.HttpStatusCode.OK, { status: http_1.HttpStatus.SUCCESS, ...body });
        }
        return new HttpResponse(http_1.HttpStatusCode.OK, body);
    }
    static created(body) {
        return new HttpResponse(http_1.HttpStatusCode.CREATED, body);
    }
    static accepted(body) {
        return new HttpResponse(http_1.HttpStatusCode.ACCEPTED, body);
    }
    static noContent() {
        return new HttpResponse(http_1.HttpStatusCode.NO_CONTENT, http_1.HttpStatus.EMPTY);
    }
    static error(body = { message: http_1.RESPONSE_MESSAGES.ERROR }) {
        return new HttpResponse(http_1.HttpStatusCode.ERROR, { status: http_1.HttpStatus.ERROR, ...body });
    }
    static notAuthorized(body = { message: http_1.RESPONSE_MESSAGES.NOT_AUTHORIZED }) {
        return new HttpResponse(http_1.HttpStatusCode.NOT_AUTHORIZED, { status: http_1.HttpStatus.ERROR, ...body });
    }
    static forbidden(body = { message: http_1.RESPONSE_MESSAGES.FORBIDDEN }) {
        return new HttpResponse(http_1.HttpStatusCode.FORBIDDEN, { status: http_1.HttpStatus.ERROR, ...body });
    }
    static notFound(body = { message: http_1.RESPONSE_MESSAGES.NOT_FOUND }) {
        return new HttpResponse(http_1.HttpStatusCode.NOT_FOUND, { status: http_1.HttpStatus.ERROR, ...body });
    }
    static passwordExpired(body = { message: http_1.RESPONSE_MESSAGES.PASSWORD_EXPIRED }) {
        return new HttpResponse(http_1.HttpStatusCode.PASSWORD_EXPIRED, { status: http_1.HttpStatus.ERROR, ...body });
    }
    static conflict(body = { message: http_1.RESPONSE_MESSAGES.CONFLICT }) {
        return new HttpResponse(http_1.HttpStatusCode.CONFLICT, { status: http_1.HttpStatus.ERROR, ...body });
    }
    static redirect(response, url) {
        return response.redirect(url);
    }
    static convertToExpress(response, httpResponse) {
        return response.status(httpResponse.statusCode).json(httpResponse.body);
    }
}
exports.default = HttpResponse;
