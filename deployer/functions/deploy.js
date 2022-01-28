"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// Imports global types
require("@twilio-labs/serverless-runtime-types");
const handler = function (context, event, callback) {
    const resp = new Twilio.Response();
    resp.setBody({ message: "Hello Leonss" });
    console.log("context", context);
    console.log("event", event);
    console.log(process.env);
    resp.setStatusCode(200);
    return callback(null, resp);
};
exports.handler = handler;
