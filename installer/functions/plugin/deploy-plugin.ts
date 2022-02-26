import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from '@twilio-labs/serverless-runtime-types/types';
import { execSync } from 'child_process';
import { LOCAL_HOST } from '../constants';

/** 
 * // TODO: Complete this and deploy using APIs
 * 
 * This Function is private and only accessible through localhost on Dockerfile  
 * It deploys the plugin with a specified version and this is done on the docker environment.
*/
export const handler: ServerlessFunctionSignature = async function(
  context: Context,
  event: {},
  callback: ServerlessCallback
) {

  const client = context.getTwilioClient();
  const response = new Twilio.Response();
  response.setStatusCode(200);
  response.appendHeader('Access-Control-Allow-Origin', '*');
  console.log(context);
  if (!context.DOMAIN_NAME.startsWith(LOCAL_HOST)) {
    response.setStatusCode(400);
    response.setBody({ error: "You cannot call this endpoint outside of localhost" });
    return callback(null, response);
  }

  try {
    // Checks if the docker process is already running or not
    const deployed = execSync("docker ps --all | grep hls-flex-plugin | wc -l");
    console.log(deployed.toString().trim());
    if (deployed.toString().trim() === '1') throw new Error("hls-flex-installer already running or deployed");

    console.log(execSync("ls").toString());
    console.log(execSync("pwd").toString());
    console.log(execSync('cd ..').toString());
    const output = execSync(
      'cd /hls-deploy && twilio flex:plugins:deploy --major --changelog "Notes for this version" --description "Test deploy"',
      {shell: "/bin/bash"}
    );

    response.setBody({data: {message: "Successfully deployed plugin!", output: output.toString()}});
    return callback(null, response);
  } catch (err: any) {
    response.setBody({ error: err });
    response.setStatusCode(400);
    return callback(err, response)
  }
}