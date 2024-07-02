"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESPONSE_MESSAGES = exports.HttpStatus = exports.HttpMessages = exports.HttpStatusCode = void 0;
exports.HttpStatusCode = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    ERROR: 400,
    NOT_AUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    PASSWORD_EXPIRED: 406,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
};
exports.HttpMessages = {
    EMPTY: "",
    INVALID_CREDS: "Invalid Credentials",
    PASSWORD_EXPIRE: "Password Expired",
    VERSION_MISMATCH: "Version Mismatched",
    INVALID_EMAIL: "Invalid Email",
    INVALID_RESET_TOKEN: "Invalid Reset Token",
    DUPLICATE_PASSWORD: "Your previous password cannot be used, please enter a unique password",
    INVALID_PASSWORD: "Invalid Password",
    PASSWORD_RESET_SUCCESS: "Password Reset Successfully",
    RESET_TOKEN_SENT: "Reset token send to mail",
    EMAIL_SENT: "Email sent successfully",
    FORBIDDEN: "Forbidden Access",
    SESSION_EXPIRE: "Session Expired",
    LOGOUT_SUCCESS: "Logout Successfully",
    FORGOT_PASSWORD_SAML: "This feature is not for FCH employees, please use your Google account to log in",
    INVALID_APP_NAME: "Invalid app name",
    TOO_MANY_REQUESTS: "Too many requests, please try again later",
    BRIDGE_THERAPY_ADDED: "Bridge Therapy added successfully"
};
exports.HttpStatus = {
    SUCCESS: "success",
    ERROR: "error",
    EMPTY: ""
};
exports.RESPONSE_MESSAGES = {
    ERROR: "Bad request",
    NOT_AUTHORIZED: "Unauthorized",
    FORBIDDEN: "Forbidden access",
    NOT_FOUND: "No data found",
    PASSWORD_EXPIRED: "Password expired",
    CONFLICT: "Already exists",
    INTERNAL_SERVER_ERROR: "Internal server error"
};
