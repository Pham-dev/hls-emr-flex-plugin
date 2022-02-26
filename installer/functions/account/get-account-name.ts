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
      const accountName = account.friendlyName;
      response.setBody({data: { accountName: accountName }});
      response.setStatusCode(200);
      return callback(null, response);
    } else {
      response.setBody({error: "No Accounts found!"});
      response.setStatusCode(400);
      return callback(null, response);
    }
  } catch (err: any) {
    response.setBody({error: err});
    response.setStatusCode(400);
    return callback(err, response)
  }
}
