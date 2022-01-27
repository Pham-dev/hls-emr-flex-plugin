// Imports global types
import '@twilio-labs/serverless-runtime-types';
// Fetches specific types
import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from '@twilio-labs/serverless-runtime-types/types';

export const handler: ServerlessFunctionSignature = function(
  context: Context,
  event: {},
  callback: ServerlessCallback
) {
  const resp = new Twilio.Response();
  resp.setBody({ message: "Hello World" });
  console.log(process.env);
  resp.setStatusCode(200);
  callback(null, resp);
};