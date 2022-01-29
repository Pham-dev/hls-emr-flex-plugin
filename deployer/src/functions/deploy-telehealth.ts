// Imports global types
import '@twilio-labs/serverless-runtime-types';
// Fetches specific types
import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from '@twilio-labs/serverless-runtime-types/types';

export const handler: ServerlessFunctionSignature = async function(
  context: Context,
  event: {},
  callback: ServerlessCallback
) {
  const resp = new Twilio.Response();
  const client = context.getTwilioClient();
  resp.setBody({ message: "Hello Leons" });

  try { 
    const account = client.api.accounts(process.env.ACCOUNT_SID!);
    const services = await client.serverless.services.list(); // serverless functions
    

    console.log(services);
    console.log(context);
    console.log("hello", account);
    // console.log(twilioClient);
    
  } catch (err) {
    console.log(err);
  }

  resp.setStatusCode(200);
  return callback(null, resp);
};