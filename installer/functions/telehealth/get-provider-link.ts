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
  response.setStatusCode(200);
  response.appendHeader('Access-Control-Allow-Origin', '*');
  try {
    const services = await client.serverless.services.list();
    //const accountName = await getParam(context, ACCOUNT_NAME);
    const account = await client.api.accounts.list();
    const accountName = account[0].friendlyName;

    const telehealthService = services.find(service => service.uniqueName === 'flex-telehealth' || service.friendlyName === 'flex-telehealth');
    const flexService = services.find(service => service.uniqueName === 'default' || service.friendlyName.startsWith('Flex Plugins Service'));

    // Check if the services exist.
    if (!telehealthService) {
      response.setStatusCode(400);
      response.setBody({error: `Telehealth App not found on account: ${accountName}`});
      return callback(null, response);
    }

    if (!flexService) {
      response.setStatusCode(400);
      response.setBody({error: `No Flex Service deployed on account: ${accountName}`});
      return callback(null, response);
    }
    const urlDomain = 'https://' + telehealthService.domainBase + '.twil.io';
    
    response.setBody({ data: urlDomain });
    return callback(null, response);

  } catch (err: any) {
    response.setBody({error: err});
    response.setStatusCode(400);
    return callback(err, response);
  }
}
