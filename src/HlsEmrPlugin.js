import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin, loadCSS } from 'flex-plugin';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';
import CustomPanel2 from './components/CustomPanel2/CustomPanel2';
import CustomCRMContainer from './components/CustomCRMContainer/CustomCRMContainer';

const PLUGIN_NAME = 'HlsEmrPlugin';

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
    flex.AgentDesktopView.Panel1.defaultProps.tasks= "helo"

    const options = { sortOrder: -1 };
    loadCSS('https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css');
    //flex.AgentDesktopView.Panel1.Content.add(<CustomTaskListContainer key="HlsEmrPlugin-component" />, options);
    flex.AgentDesktopView.Panel1.Content.add(<div key="hello-component">{"Hello World"}</div>, options);
    flex.AgentDesktopView.Panel2.Content.add(<CustomPanel2 key="CustomPanel2-component"/>, options);
    flex.CRMContainer.Content.replace(<CustomCRMContainer key="CustomCRMContainer-component"/>, options);
    
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
