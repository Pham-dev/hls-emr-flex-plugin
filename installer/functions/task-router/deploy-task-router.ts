// Imports global types
import '@twilio-labs/serverless-runtime-types';
import { createTaskQueue, createWorkspace, getAllWorkflows, getAllTaskQueues, createWorkflow, getAllWorkers, giveAllSkillsToWorker, updateDefaultWorkflow, ASSIGN_TO_ANYONE, getDefaultConfig } from './task-router-helpers.private';
import { 
  WORKSPACE_FRIENDLY_NAME,
  SCHEDULERS,
  EDUCATORS,
  SCHEDULING,
  EDUCATION,
  INTAKE_BY_SCHEDULERS,
  TRANSFER_TO_NURSE_EDUCATOR
} from './task-router-helpers.private';
// Fetches specific types
import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from '@twilio-labs/serverless-runtime-types/types';
import { WorkflowInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/workflow';

export const handler: ServerlessFunctionSignature = async function(
  context: Context,
  event: {},
  callback: ServerlessCallback
) {
  
  const client = context.getTwilioClient();
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');

  try {
    // Get the Flex Workspace
    let flexWorkspace = await client.taskrouter.workspaces
      .list()
      .then(workspaces => workspaces.find(workspace => WORKSPACE_FRIENDLY_NAME === workspace.friendlyName));

    // If We don't have a flex_workspace, create it.  Flex Accounts only allowed one Workspace.
    if (!flexWorkspace) flexWorkspace = await createWorkspace(client, WORKSPACE_FRIENDLY_NAME);
    const workspaceSid = flexWorkspace.sid;

    // Find the Queues and create them if they don't exist yet
    const taskQueues = await getAllTaskQueues(client, workspaceSid);
    let schedulersQueue = taskQueues.find(q => q.friendlyName === SCHEDULERS);
    let educatorsQueue = taskQueues.find(q => q.friendlyName === EDUCATORS);
    if (!schedulersQueue) {
      schedulersQueue = await createTaskQueue(client, SCHEDULERS, workspaceSid, SCHEDULING);
    }
    if (!educatorsQueue) {
      educatorsQueue = await createTaskQueue(client, EDUCATORS, workspaceSid, EDUCATION);
    }

    // Create workflows if they do not exist
    const schedulersQueueSid = schedulersQueue.sid;
    const educatorsQueueSid = educatorsQueue.sid;
    const allWorkflows = await getAllWorkflows(client, workspaceSid);
    const defaultWorkflow: WorkflowInstance | undefined = allWorkflows.find(workflow => workflow.friendlyName === ASSIGN_TO_ANYONE);
    const schedulerWorkflow: WorkflowInstance | undefined = allWorkflows.find(workflow => workflow.friendlyName === INTAKE_BY_SCHEDULERS);
    const educatorWorkflow: WorkflowInstance | undefined = allWorkflows.find(workflow => workflow.friendlyName === TRANSFER_TO_NURSE_EDUCATOR);
    const schedulerConfiguration = getDefaultConfig(schedulersQueueSid);
    const educatorConfiguration = getDefaultConfig(educatorsQueueSid);
    if (!schedulerWorkflow) {
      if (!defaultWorkflow) {
        const wf = await createWorkflow(client, workspaceSid, INTAKE_BY_SCHEDULERS, schedulerConfiguration);
        console.log(wf);
      } else {
        const wf = await updateDefaultWorkflow(client, workspaceSid, INTAKE_BY_SCHEDULERS, defaultWorkflow.sid, schedulerConfiguration);
        console.log(wf);
      } 
    }
    if (!educatorWorkflow) {
      await createWorkflow(client, workspaceSid, TRANSFER_TO_NURSE_EDUCATOR, educatorConfiguration);
    }

    // Give admin user (current user, hopefully) both skills (Scheduler and Nurse Educator).
    const workers = await getAllWorkers(client, workspaceSid);
    if (!workers) {
      response.setStatusCode(400);
      response.setBody({error: "No workers in your Flex Account.  Please create a worker in your TaskRouter console."})
      return callback(null, response);
    }
    const adminWorker = workers[0];
    const w = await giveAllSkillsToWorker(client, workspaceSid, adminWorker.sid, adminWorker.attributes);
    console.log("Admin Worker given 'Education', 'language*es-xl', and 'Scheduling' skills.  Admin's new attributes: ", w.attributes);
    
    response.setBody({Message: 'HLS Flex Plugin Account Setup completed'});
    response.setStatusCode(200);
    return callback(null, response);

  } catch (err) {
    console.log(err);
    response.setBody(
      {
        Message: "Error creating either workspace, task queues, or workflows",
        Error: err
      }
    );
    response.setStatusCode(400);
    return callback(null, response);
  }
  
};
