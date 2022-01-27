"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// Imports global types
require("@twilio-labs/serverless-runtime-types");
const handler = function (context, event, callback) {
    const resp = new Twilio.Response();
    resp.setBody({ message: "Hello World" });
    console.log(context, event);
    resp.setStatusCode(200);
    callback(null, resp);
};
exports.handler = handler;
