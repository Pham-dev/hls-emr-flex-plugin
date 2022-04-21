import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from '@twilio-labs/serverless-runtime-types/types';
import { 
  deleteService, 
  deployLocalFunctions, 
  getAssets, 
  getFunctionDependencies, 
  getHLSFlexService, 
  getProviderLinkFunction 
} from './helper-telehealth.private';
import { getParam } from '../common';
import { ApplicationContext, DeployProjectParams } from '../interface';
import { ACCOUNT_SID, AUTH_TOKEN, HLS_FLEX_SERVICE } from '../constants';
import { DeployProjectConfig } from '@twilio-labs/serverless-api';

export const handler: ServerlessFunctionSignature = async function(
  context: Context,
  event: {},
  callback: ServerlessCallback
) {
  const client = context.getTwilioClient();
  const appContext = context as ApplicationContext;
  const response = new Twilio.Response();
  response.setStatusCode(200);
  const accountSid = await getParam(context, ACCOUNT_SID)!
  const authToken = await getParam(context, AUTH_TOKEN)!
  response.appendHeader('Access-Control-Allow-Origin', '*');

  try {
    
    const options: DeployProjectParams = {context: appContext} 

    // create this to deploy local functions

    const function_ = await getProviderLinkFunction();
    const dependencies = getFunctionDependencies();
    console.log("DEPENDENCIES");

    const deployOptions: DeployProjectConfig = {
      accountSid: accountSid!,
      authToken: authToken!,
      pkgJson: {
        dependencies: dependencies
      },
      functionsEnv: 'dev',
      functions: function_,
      serviceName: HLS_FLEX_SERVICE,
      env: {
        ACCOUNT_SID: accountSid,
        AUTH_TOKEN: authToken!
      },
      assets: await getAssets(),
    };

    // We create the service with the functions if the service does not exist.
    let hlsFlexService = await getHLSFlexService(client);
    //await deleteService(client, hlsFlexService!.sid);
    if (!hlsFlexService) {
      const result = await deployLocalFunctions(options, deployOptions);
      console.log("results", result);
    } else {
      response.setBody({data: "Service already exists"});
      return callback(null, response);
    }
    
    response.setBody({data: "success"});
    return callback(null, response);

  } catch (err: any) {
    response.setBody({error: err});
    response.setStatusCode(400);
    return callback(err, response);
  }
}