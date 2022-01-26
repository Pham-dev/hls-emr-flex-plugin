import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import reducers, { namespace } from './states';
import PatientInteractionPane from './components/CustomPanel2/Panes/PatientInteractionPane/PatientInteractionPane';
import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import CustomPanel2Container from './components/CustomPanel2/CustomPanel2.Container';
import { CustomTheme } from './CustomTheme';

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
    // console.log(manager.store.getState());
    this.registerReducers(manager);
    const flexInfo = getFlexObject(manager.workerClient);
    const options = { sortOrder: -1 };
    const configuration = {
      colorTheme: CustomTheme
    };

    flex.MainHeader.defaultProps.logoUrl = "https://hls-site-4115-dev.twil.io/owlhealth/images/logoOwlHealth.png"

    manager.updateConfig(configuration);
    manager.strings.NoTasksTitle = "Task Status";
    manager.strings.NoTasks = "No Patient Tasks";
    //console.log(manager.store.getState());
    flex.CRMContainer.Content.replace(<div key="empty-div-component"/>, options);
    flex.AgentDesktopView.Panel2.Content.add(<CustomPanel2Container key={"CustomPanel2-component"} flexInfo={flexInfo} flex={flex}/> , options);
    flex.AgentDesktopView.defaultProps.splitterOptions = {
      minimumSecondPanelSize: "840px",
      minimumFirstPanelSize: "360px",
      initialFirstPanelSize: "440px"
    }
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
