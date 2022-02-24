import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from '@twilio-labs/serverless-runtime-types/types';
import { convertToBase64, listPluginsEndpoint } from './helper-plugins.private';
import axios from 'axios';
import { getParam, ACCOUNT_SID, AUTH_TOKEN } from '../common';

/**
 * This function is used to get all current plugins.
 * If a plugin is not deployed via Docker, it will not be listed.
 * Returns a list of plugins that have been deployed on the current account 
 * provided we give it the SID and Auth Token
 *  */ 
export const handler: ServerlessFunctionSignature = async function(
  context: Context,
  event: {},
  callback: ServerlessCallback
) {

  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.setStatusCode(200);

  try {
    const accountSid = await getParam(context, ACCOUNT_SID);
    const authToken = await getParam(context, AUTH_TOKEN);

    console.log(accountSid, authToken);
    const basicAuthBase64 = convertToBase64(accountSid + ":" + authToken)
    
    const pluginsResp = await axios.get(listPluginsEndpoint, {
      headers: {
        Authorization: `Basic ${basicAuthBase64}`
      }
    })
    .then(res => res.data)
    .catch(error => console.error(error));

    if (!pluginsResp) {
      response.setBody({message: "No Plugins found on this account."});
    } else {
      response.setBody({data: pluginsResp});
    }
    return callback(null, response);
  } catch (err: any) {
    response.setBody({error: err});
    response.setStatusCode(400);
    return callback(err, response)
  }
}