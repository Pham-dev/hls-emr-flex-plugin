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
  const client = context.getTwilioClient();
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  try {
    const accounts = await client.api.accounts
      .list({status: 'active', limit: 20})
      .then(accounts => accounts);
  
    if (accounts.length) {
      const accountName = accounts[0].friendlyName;
      response.setBody({data: { accountName: accountName } });
      response.setStatusCode(200);
      callback(null, response);
    } else {
      throw new Error("No Accounts found!");
    }
  } catch (err: any) {
    response.setBody({error: err});
    response.setStatusCode(400);
    callback(err, response)
  }
}