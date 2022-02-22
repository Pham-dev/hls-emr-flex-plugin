import { TwilioClient } from '@twilio-labs/serverless-runtime-types/types';
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

/**
 * This function creates a workspace within the account's TaskRouter 
 * Only 1 Workspace can exist in a Twilio account
 * 
 * @param client 
 * @param friendlyName 
 * @returns Promise<WorkspaceInstance>
 */
export function createWorkspace(client: TwilioClient, friendlyName: string): Promise<WorkspaceInstance> {
  const workspace = client.taskrouter.workspaces
        .create({
          template: 'FIFO',
          friendlyName
        })
        .then(workspace => workspace);
  return workspace;
}

/**
 * Creates task queue given a workspace SID.
 * Creates task queues for workers to receive tasks.
 * 
 * @param client
 * @param friendlyName
 * @param workspaceSid
 * @param skill
 * @returns Promise<TaskQueueInstance>
 */
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

/**
 * Gets all TaskQueues in the current account.
 * returns a list of all TaskQueues
 * 
 * @param client 
 * @param workspaceSid 
 * @returns Promise<TaskQueueInstance[]>
 */
export function getAllTaskQueues(client: TwilioClient, workspaceSid: string): Promise<TaskQueueInstance[]> {
  const taskQueues = client.taskrouter.workspaces(workspaceSid)
    .taskQueues
    .list()
    .then(queues => queues);
  return taskQueues;
}

/**
 * Returns all Workflow instances
 * 
 * @param client 
 * @param workspaceSid 
 * @returns Promise<WorkflowInstance[]>
 */
export function getAllWorkflows(client: TwilioClient, workspaceSid: string): Promise<WorkflowInstance[]> {
  const workflows = client.taskrouter.workspaces(workspaceSid)
    .workflows
    .list()
    .then(workflows => workflows);
  return workflows;
}

/**
 * Creates a workflow within the TaskRouter.
 * 
 * @param client 
 * @param workspaceSid 
 * @param friendlyName 
 * @param configuration 
 * @returns Promise<WorkflowInstance>
 */
export function createWorkflow(client: TwilioClient, workspaceSid: string, friendlyName: string, configuration: string): Promise<WorkflowInstance> {
  const workspace = client.taskrouter.workspaces(workspaceSid)
    .workflows
    .create({
      friendlyName,
      configuration,
    })
    .then(workspace => workspace);
  return workspace;
}

/**
 * Returns a list of all workers
 * 
 * @param client 
 * @param workspaceSid 
 * @returns Promise<WorkerInstance[]>
 */
export function getAllWorkers(client: TwilioClient, workspaceSid: string): Promise<WorkerInstance[]> {
  const workers = client.taskrouter.workspaces(workspaceSid)
    .workers
    .list()
    .then(worker => worker);
  return workers;
}


/**
 * Gives a user all skills ["Scheduling", "Education"]
 * Intended to modify only the attributes of the admin user
 * 
 * @param client 
 * @param workspaceSid 
 * @param workerSid 
 * @param attributes 
 * @returns Promise<WorkerInstance>
 */
export function giveAllSkillsToWorker(client: TwilioClient, workspaceSid: string, workerSid: string, attributes: string): Promise<WorkerInstance> {
  const jsonAttributes = JSON.parse(attributes);
  jsonAttributes.routing = {
    skills: [SCHEDULING, EDUCATION],
    levels: {},
  }
  const worker = client.taskrouter.workspaces(workspaceSid)
    .workers(workerSid)
    .update({
      attributes: JSON.stringify(jsonAttributes)
    })
    .then(worker => worker);
  return worker;
}