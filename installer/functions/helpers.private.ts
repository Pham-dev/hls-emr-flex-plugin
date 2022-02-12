import { Context, TwilioClient } from '@twilio-labs/serverless-runtime-types/types';
import { WorkspaceInstance } from 'twilio/lib/rest/taskrouter/v1/workspace';
import { TaskQueueInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/taskQueue';

function isLocalhost(context: Context) {
  return context.DOMAIN_NAME.startsWith('localhost:');
}

export function getParam(context: Context, key: string) {
  const client = context.getTwilioClient();
  try {
    switch (key) {
      case 'IS_LOCALHOST': {
        return isLocalhost(context);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

// Function which creates Flex Workspace
export function createWorkspace(client: TwilioClient, friendlyName: string): Promise<WorkspaceInstance> {
  const workspace = client.taskrouter.workspaces
        .create({
          template: 'FIFO',
          friendlyName
        })
        .then(workspace => workspace);
  return workspace;
}

// Creates task queue given a workspace SID
export function createTaskQueue(client: TwilioClient, friendlyName: string, workspace_sid: string, skill = ""): Promise<TaskQueueInstance> {
  const taskQueue = client.taskrouter.workspaces(workspace_sid)
    .taskQueues
    .create({
      friendlyName,
      targetWorkers: skill ? `routing.skills HAS "${skill}"` : "1==1"
    })
    .then(task_queue => task_queue);
  return taskQueue;
}

export function getTaskQueues(client: TwilioClient, workspace_sid: string): Promise<TaskQueueInstance[]> {
  const taskQueues = client.taskrouter.workspaces(workspace_sid)
    .taskQueues
    .list()
    .then(queues => queues);
  return taskQueues;
}