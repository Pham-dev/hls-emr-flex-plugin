// Imports global types
import '@twilio-labs/serverless-runtime-types';
import { createTaskQueue, createWorkspace, getAllWorkflows, getAllTaskQueues, createWorkflow, QueueToQueueSid, getAllWorkers } from './task-router-helpers.private';
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
    const schedulersQueue = taskQueues.find(q => q.friendlyName === SCHEDULERS);
    const educatorsQueue = taskQueues.find(q => q.friendlyName === EDUCATORS);
    if (!schedulersQueue) await createTaskQueue(client, SCHEDULERS, workspaceSid, SCHEDULING);
    if (!educatorsQueue) await createTaskQueue(client, EDUCATORS, workspaceSid, EDUCATION);

    
    // Create workflows if they do not exist
    const schedulerQueueSid = schedulersQueue?.sid!;
    const educatorsQueueSid = educatorsQueue?.sid!;
    const queueToQueueSidMap: QueueToQueueSid = {
      schedulerSid: schedulerQueueSid,
      educatorSid: educatorsQueueSid
    }
    const allWorkflows = await getAllWorkflows(client, workspaceSid);
    const schedulerWorkflow: WorkflowInstance | undefined = allWorkflows.find(workflow => workflow.friendlyName === INTAKE_BY_SCHEDULERS);
    const educatorWorkflow: WorkflowInstance | undefined = allWorkflows.find(workflow => workflow.friendlyName === TRANSFER_TO_NURSE_EDUCATOR);
    const schedulerConfiguration = getWorkflowConfiguration(schedulerQueueSid, SCHEDULERS);
    const educatorConfiguration = getWorkflowConfiguration(educatorsQueueSid, EDUCATORS);
    if (!schedulerWorkflow) await createWorkflow(client, workspaceSid, INTAKE_BY_SCHEDULERS, queueToQueueSidMap, schedulerConfiguration, schedulerQueueSid);
    if (!educatorWorkflow) await createWorkflow(client, workspaceSid, TRANSFER_TO_NURSE_EDUCATOR, queueToQueueSidMap, educatorConfiguration, educatorsQueueSid);

    // Give all current workers the scheduler and education skills, will be able to 
    // const workerSids: string[] = (await getAllWorkers(client, workspaceSid)).map(worker => worker.sid);
    // console.log(workerSids);

    // const workers: WorkerInstance[] = await getAllWorkers(client, workspaceSid);
    // console.log(workers);
    
    response.setBody({Message: 'HLS Flex Plugin Account Setup completed'});
    response.setStatusCode(200);
    callback(null, response);

  } catch (err) {
    console.log(err);
    response.setBody(
      {
        Message: "Error creating either workspace, task queues, or workflows",
        Error: err
      }
    );
    response.setStatusCode(400);
    callback(null, response);
  }
  
};

const getWorkflowConfiguration = (queueSid: string, role: string): string => {
  if (role === SCHEDULERS) {
    return JSON.stringify({
      task_routing: {
        filters: [
          {
            filter_friendly_name: "Schedulers Filter",
            expression: 'routing.skills HAS "Scheduling"',
            targets: [
              {
                queue: queueSid
              }
            ]
          },
        ],
      },
      default_filter: {
        queue: queueSid
      }
    });
  } else if (role === EDUCATORS) {
    return JSON.stringify({
      task_routing: {
        filters: [
          {
            filter_friendly_name: "Schedulers Filter",
            expression: 'routing.skills HAS "Education"',
            targets: [
              {
                queue: queueSid
              }
            ]
          },
        ],
      },
      default_filter: {
        queue: queueSid
      }
    });
  } else {
    return "";
  }
}
