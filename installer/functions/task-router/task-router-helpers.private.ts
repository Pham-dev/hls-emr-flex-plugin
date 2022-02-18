import { Context, TwilioClient } from '@twilio-labs/serverless-runtime-types/types';
import { WorkspaceInstance } from 'twilio/lib/rest/taskrouter/v1/workspace';
import { TaskQueueInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/taskQueue';
import { WorkerInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/worker';
import { WorkflowInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/workflow';

export const WORKSPACE_FRIENDLY_NAME = "Flex Task Assignment";
export const SCHEDULERS = "Schedulers";
export const EDUCATORS = "Educators";
export const SCHEDULING = "Scheduling";
export const EDUCATION = "Education";
export const INTAKE_BY_SCHEDULERS = "Intake by Schedulers";
export const TRANSFER_TO_NURSE_EDUCATOR = "Transfer to Nurse Educator";

export interface QueueToQueueSid {
  schedulerSid: string;
  educatorSid: string;
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
export function createTaskQueue(client: TwilioClient, friendlyName: string, workspaceSid: string, skill?: string): Promise<TaskQueueInstance> {
  const taskQueue = client.taskrouter.workspaces(workspaceSid)
    .taskQueues
    .create({
      friendlyName,
      targetWorkers: skill ? `routing.skills HAS "${skill}"` : "1==1"
    })
    .then(task_queue => task_queue);
  return taskQueue;
}

export function getAllTaskQueues(client: TwilioClient, workspaceSid: string): Promise<TaskQueueInstance[]> {
  const taskQueues = client.taskrouter.workspaces(workspaceSid)
    .taskQueues
    .list()
    .then(queues => queues);
  return taskQueues;
}

export function getAllWorkflows(client: TwilioClient, workspaceSid: string): Promise<WorkflowInstance[]> {
  const workflows = client.taskrouter.workspaces(workspaceSid)
    .workflows
    .list()
    .then(workflows => workflows);
  return workflows;
}

export function createWorkflow(client: TwilioClient, workspaceSid: string, friendlyName: string, queueToQueueSid: QueueToQueueSid, configuration: string, defaultQueueSid?: string): Promise<WorkflowInstance> {
  const workspace = client.taskrouter.workspaces(workspaceSid)
    .workflows
    .create({
      friendlyName,
      configuration,
    })
    .then(workspace => workspace);
  return workspace;
}

export function getAllWorkers(client: TwilioClient, workspaceSid: string): Promise<WorkerInstance[]> {
  const workers = client.taskrouter.workspaces(workspaceSid)
    .workers
    .list()
    .then(worker => worker);
  return workers;
}

export function giveAllSkillsToWorker(client: TwilioClient, workspaceSid: string, workerSid: string): Promise<WorkerInstance> {
  const worker = client.taskrouter.workspaces(workspaceSid)
    .workers(workerSid)
    .update({
      attributes: JSON.stringify({
        routing: {
          skills: [SCHEDULING, EDUCATION],
          levels: {}
        }
      })
    })
    .then(worker => worker);
  return worker;
}