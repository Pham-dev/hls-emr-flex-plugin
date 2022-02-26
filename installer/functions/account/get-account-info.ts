import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from '@twilio-labs/serverless-runtime-types/types';
import { getActiveAccount } from '../common';

export const handler: ServerlessFunctionSignature = async function(
  context: Context,
  event: {},
  callback: ServerlessCallback
) {
  const client = context.getTwilioClient();
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  try {
    const account = await getActiveAccount(client);
    if (account) {
      response.setBody({data: 
        { 
          accountSid: account.sid,
          authToken: account.authToken
        } 
      });
      response.setStatusCode(200);
      return callback(null, response);
    } else {
      throw new Error("No Accounts found!");
    }
  } catch (err: any) {
    response.setBody({error: err});
    response.setStatusCode(400);
    return callback(err, response)
  }
}