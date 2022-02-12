// Imports global types
import '@twilio-labs/serverless-runtime-types';
import { createTaskQueue, createWorkspace, getParam, getTaskQueues } from './helpers.private';
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
  const WORKSPACE_FRIENDLY_NAME = "Flex Task Assignment";
  const SCHEDULERS = "Schedulers";
  const EDUCATORS = "Educators";
  const SCHEDULING = "Scheduling";
  const EDUCATION = "Education";

  const client = context.getTwilioClient();
  const response = new Twilio.Response();

  try {
    // Get the Flex Workspace
    let flexWorkspace = await client.taskrouter.workspaces.list()
    .then(workspaces => workspaces.find(workspace => WORKSPACE_FRIENDLY_NAME === workspace.friendlyName));

    // If We don't have a flex_workspace, create it.  Flex Accounts only allowed one Workspace.
    if (flexWorkspace === undefined) {
      flexWorkspace = await createWorkspace(client, WORKSPACE_FRIENDLY_NAME);
    }
    const workspaceSid = flexWorkspace.sid;

    const taskQueues = await getTaskQueues(client, workspaceSid);
    const schedulersQueue = taskQueues.find(q => q.friendlyName === SCHEDULERS);
    const educatorsQueue = taskQueues.find(q => q.friendlyName === EDUCATORS);

    if (!schedulersQueue) await createTaskQueue(client, SCHEDULERS, workspaceSid, SCHEDULING);
    if (!educatorsQueue) await createTaskQueue(client, EDUCATORS, workspaceSid, EDUCATION);


    

    //console.log(getParam(context, 'IS_LOCALHOST'));
    console.log(workspaceSid)

    
    response.setBody({hello: 'Hello World!'});
    response.setStatusCode(200);
    callback(null, response);

  } catch (err) {
    console.log(typeof err);
    response.setBody({Error: "Error creating either workspace, task queues, or workflows"});
    response.setStatusCode(400);
    callback(null, response);
  }
  
};