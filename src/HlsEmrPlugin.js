import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import reducers, { namespace } from './states';
import CustomPanel2 from './components/CustomPanel2/CustomPanel2';
import CustomCRMContainer from './components/CustomCRMContainer/CustomCRMContainer';

const PLUGIN_NAME = 'HlsEmrPlugin';

function getFlexObject(workerClient) {
  return {
    skills: workerClient.attributes.routing.skills,
    full_name: workerClient.attributes.full_name,
    name: workerClient.name,
    email: workerClient.attributes.email,
    workspaceSid: workerClient.workspaceSid,
    token: workerClient._config.token,
    accountSid: workerClient.accountSid,
    sid: workerClient.sid
  }
}

function getIsActiveReservation(workerClient) {
  console.log("Worker CLient", workerClient)
  console.log(workerClient.name)
  console.log(workerClient.reservervations)
  return workerClient.reservervations;
}

export default class HlsEmrPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);
    flex.AgentDesktopView.Panel1.defaultProps.tasks= "helo";

    const flexInfo = getFlexObject(manager.workerClient);
    const isScheduler = flexInfo.skills[0] === 'Scheduling' ? true : false;
    console.log(isScheduler);

    const options = { sortOrder: -1 };

    //flex.AgentDesktopView.Panel1.Content.add(<CustomTaskListContainer key="HlsEmrPlugin-component" />, options);
    flex.AgentDesktopView.Panel1.Content.add(<div key="hello-component">{"Hello World"}</div>, options);
    flex.AgentDesktopView.Panel2.Content.add(<CustomPanel2 key="CustomPanel2-component" flexInfo={flexInfo} /> , options);
    flex.CRMContainer.Content.replace(isScheduler ? <div key="empty-div-component"/> : <div key="empty-div-component"/>, options);
    flex.TaskInfoPanel.Content.add(<div key="hello"></div>)
    
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
